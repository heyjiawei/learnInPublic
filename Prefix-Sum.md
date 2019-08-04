Prefix Sum
the prefix sums technique: it basically describes a way to pre-compute the cumulative sum for each value in a sequence, so they can be used later for a faster calculation of the total between the given indexes.

Input  : arr[] = {10, 20, 10, 5, 15}
Output : prefixSum[] = {10, 30, 40, 45, 60}

Explanation : While traversing the array, update 
the element by adding it with its previous element.
prefixSum[0] = 10, 
prefixSum[1] = prefixSum[0] + arr[1] = 30, 
prefixSum[2] = prefixSum[1] + arr[2] = 40 and so on.

Let P[i] = A[0] + A[1] + ... + A[i-1]. 
Then P[j+1] - P[i] = A[i] + A[i+1] + ... + A[j], the sum of the subarray [i, j].

Hence, we are looking for the number of i < j with P[j] - P[i] = S.

How is it useful?

It does is an O(N) operation to calcule all the cumulative sums based on the gains array. For instance, with gains = [1, 2, 3] it would compute sums = [0, 1, 3, 6].

The second part just takes each query, O(M), and subtracts the pre-computed sums found in sums array. The correctness is ensured since the difference between their prefix sums is equivalent to the sum of all values present in their range.

gains   = [102, 55, 320, 250, 215, 142, 54, 32, 121, 224, 458, 276]
queries = [0..11, 0..1, 9..11]
sums    = [0]
# 1. Prefix sum calculation:
(1..gains.length).each do |i|
  sums[i] = sums[i - 1] + gains[i - 1]
end
# 2. Query resolution:
queries.map do |query|
  sums[query.end + 1] - sums[query.begin]
end
# Result: [2249, 157, 958]