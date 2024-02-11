// Function to Check if the data is sorted
export default function checkSorted(data) {
  let isSorted = true;
  for (let i = 0; i < data.length - 1; i++) {
    if (data[i].data[0] > data[i + 1].data[0]) {
      isSorted = false;
      break;
    }
  }
  return isSorted;
}
