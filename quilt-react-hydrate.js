import { createContext, useRef, MutableRefObject } from "react";


const HYDRATION_ATTRIBUTE = 'data-hydration-id';
const DEFAULT_HYDRATION_ID = Symbol('defaultId');
const DEFAULT_HYDRATION_PREFIX = 'hydration';
const EFFECT_ID = Symbol('react-hydrate');

const HydrationContext = createContext<HydrationManager>(
  new HydrationManager(),
);
const EffectContext = React.createContext<EffectManager | null>(null);

/**
 * Types
 */

interface EffectKind {
  readonly id: symbol;
  betweenEachPass?(pass: Pass): any;
  afterEachPass?(pass: Pass): any;
}
/**
* End of Types
*/

/**
 * Helper functions
 */
const UNSET = Symbol('unset');

function useLazyRef<T>(getValue: () => T): MutableRefObject<T> {
  const ref = useRef<T | typeof UNSET>(UNSET);

  if (ref.current === UNSET) {
    ref.current = getValue();
  }

  return ref as MutableRefObject<T>;
}

function useServerEffect(perform: () => any, kind?: EffectKind) {
  const manager = useContext(EffectContext);

  if (manager == null || (kind != null && !manager.shouldPerform(kind))) {
    return;
  }

  manager.add(perform(), kind);
}

/**
 * End of Helper functions
 */

class HydrationManager {
  hydrated = false;

  readonly effect: EffectKind = {
    id: EFFECT_ID,
    betweenEachPass: () => {
      this.ids.clear();
      this.hydration.clear();
    },
  };

  private readonly ids = new Map<
    string | typeof DEFAULT_HYDRATION_ID,
    number
  >();

  private readonly hydration = new Map<string, string>();

  constructor() {
    if (typeof document !== 'undefined') {
      for (const element of document.querySelectorAll(
        `[${HYDRATION_ATTRIBUTE}]`,
      )) {
        this.hydration.set(
          element.getAttribute(HYDRATION_ATTRIBUTE)!,
          element.innerHTML,
        );
      }
    }
  }

  hydrationId(id?: string) {
    const finalId = id || DEFAULT_HYDRATION_ID;
    const current = this.ids.get(finalId) || 0;
    this.ids.set(finalId, current + 1);
    return `${id || DEFAULT_HYDRATION_PREFIX}${current + 1}`;
  }

  getHydration(id: string) {
    return this.hydration.get(id);
  }
}

function HydratorExecutioner({children, id}: {
  id?: string;
  children?: React.ReactNode;
}) {
  const manager = React.useContext(HydrationContext);
  const hydrationId = useLazyRef(() => manager.hydrationId(id)).current;
  const hydrationProps = {[HYDRATION_ATTRIBUTE]: hydrationId};

  useServerEffect(() => {}, manager.effect);

  return children ? (
    <div {...hydrationProps}>{children}</div>
  ) : (
    <div
      {...hydrationProps}
      dangerouslySetInnerHTML={{
        __html: manager.getHydration(hydrationId) || '',
      }}
    />
  );
}

const Hydrator = React.memo(HydratorExecutioner);

class EffectManager {
  private include: symbol[] | boolean;
  private effects: Promise<any>[] = [];
  private kinds = new Set<EffectKind>();

  get finished() {
    return this.effects.length === 0;
  }

  constructor({include = true}: Options = {}) {
    this.include = include;
  }

  reset() {
    this.effects = [];
    this.kinds = new Set();
  }

  add(effect: any, kind?: EffectKind) {
    if (kind != null) {
      this.kinds.add(kind);
    }

    if (effect == null || typeof effect !== 'object' || !('then' in effect)) {
      return;
    }

    this.effects.push(effect);
  }

  async resolve() {
    await Promise.all(this.effects);
  }

  async betweenEachPass(pass: Pass) {
    await Promise.all(
      [...this.kinds].map(kind =>
        typeof kind.betweenEachPass === 'function'
          ? kind.betweenEachPass(pass)
          : Promise.resolve(),
      ),
    );
  }

  async afterEachPass(pass: Pass) {
    const results = await Promise.all(
      [...this.kinds].map(kind =>
        typeof kind.afterEachPass === 'function'
          ? kind.afterEachPass(pass)
          : Promise.resolve(),
      ),
    );

    return results.every(result => result !== false);
  }

  shouldPerform(kind: EffectKind) {
    const {include} = this;

    if (!include) {
      return false;
    }

    return include === true || (kind != null && include.includes(kind.id));
  }
}