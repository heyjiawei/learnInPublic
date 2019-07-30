#Consistency patterns
With duplicate data, we will have to synchronize them between systems to ensure data consistency between systems.

Weak Consistency
- After a write, reads may not be seen. It may never be seen, it also may not be seen immediately.
- This works well in real time calls - when the packets are dropped during call, you don't hear what's said then. 

Eventual Consistency
- After a write, reads will eventually be seen. It just takes some time before data is consistent.
- This works well in highly available systems

Strong Consistency
- After a write, the read will be seen.
- This is seen in file systems and RDBMS - where transactions go through or rollback.
- This works well in systems that need transactions.