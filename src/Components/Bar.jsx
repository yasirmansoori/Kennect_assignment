import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { BarChart } from "@mui/x-charts/BarChart";
import { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import Alert from "@mui/material/Alert";
import data from "../data/data";
import getRandomColor from "../Helpers/getRandomColor";
import checkSorted from "../Helpers/checkSorted";

export default function BarAnimation() {
  // State variables to manage animation and data
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(5); // Adjust the speed as needed
  const [seriesData, setSeriesData] = useState(data);

  // Function to randomize the data
  const RandomizeData = () => {
    setOpen(false);
    const data = seriesData.map((item) => {
      item.data[0] = Math.floor(Math.random() * 2500) + 1;
      item.label = item.data[0].toString();
      item.color = getRandomColor();
      return item;
    });
    setSeriesData([...data]);
  };

  // Handler for animation speed change
  const handleAnimationSpeed = (event, newValue) => {
    setAnimationSpeed(newValue);
  };

  // Function to animate the Insertion Sort algorithm
  const animateInsertion = async () => {
    setDisabled(true);
    const data = [...seriesData];
    // check if the data is already sorted then alert the user and return
    if (checkSorted(data)) {
      setOpen(true);
      setDisabled(false);
      return;
    }
    for (let i = 1; i < data.length; i++) {
      let j = i - 1;
      const key = data[i];
      data[i].color = "black";

      while (j >= 0 && data[j].data[0] > key.data[0]) {
        data[j + 1] = data[j];
        j = j - 1;
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 / animationSpeed)
        );
        setSeriesData([...data]);
      }

      data[j + 1] = key;
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 / animationSpeed)
      );
      setSeriesData([...data]);
    }
    data.forEach((item) => {
      item.color = getRandomColor();
    });
    setSeriesData([...data]);
    setDisabled(false);
  };

  // Function to animate the Selection Sort algorithm
  const animateSelection = async () => {
    setDisabled(true);
    const data = [...seriesData];

    // check if the data is already sorted then alert the user and return
    if (checkSorted(data)) {
      setOpen(true);
      setDisabled(false);
      return;
    }

    for (let i = 0; i < data.length - 1; i++) {
      let minIndex = i;

      let sameMatchingBarColor = getRandomColor();
      for (let j = i + 1; j < data.length; j++) {
        data[j].color = sameMatchingBarColor;
        data[minIndex].color = sameMatchingBarColor;

        if (data[j].data[0] < data[minIndex].data[0]) {
          minIndex = j;
        }

        await new Promise((resolve) =>
          setTimeout(resolve, 1000 / animationSpeed)
        );

        setSeriesData([...data]);
      }

      const temp = data[i];
      data[i] = data[minIndex];
      data[minIndex] = temp;

      data[i].color = getRandomColor();
      data[minIndex].color = getRandomColor();

      await new Promise((resolve) =>
        setTimeout(resolve, 1000 / animationSpeed)
      );

      setSeriesData([...data]);
    }

    setDisabled(false);
  };

  // Function to animate the Bubble Sort algorithm
  const animateBubble = async () => {
    setDisabled(true);
    const data = [...seriesData];

    // check if the data is already sorted then alert the user and return
    if (checkSorted(data)) {
      setOpen(true);
      setDisabled(false);
      return;
    }

    for (let i = 0; i < data.length - 1; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        data.forEach((item) => {
          item.color = "black";
        });

        data[j].color = getRandomColor();
        data[j + 1].color = getRandomColor();

        if (data[j].data[0] > data[j + 1].data[0]) {
          const tempColor = data[j].color;
          data[j].color = data[j + 1].color;
          data[j + 1].color = tempColor;

          const temp = data[j];
          data[j] = data[j + 1];
          data[j + 1] = temp;

          await new Promise((resolve) =>
            setTimeout(resolve, 1000 / animationSpeed)
          );

          setSeriesData([...data]);
        }
      }

      data[data.length - i - 1].color = getRandomColor();

      await new Promise((resolve) =>
        setTimeout(resolve, 1000 / animationSpeed)
      );

      setSeriesData([...data]);
    }

    data[0].color = "black";
    setSeriesData([...data]);

    setDisabled(false);
  };

  // Function to animate the Quick Sort algorithm
  const animateQuick = async () => {
    setDisabled(true);
    const data = [...seriesData];

    // check if the data is already sorted then alert the user and return
    if (checkSorted(data)) {
      setOpen(true);
      setDisabled(false);
      return;
    }
    const quickSort = async (arr, low, high) => {
      if (low < high) {
        const pivotIndex = await partition(arr, low, high);

        await quickSort(arr, low, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, high);
      }
    };

    const partition = async (arr, low, high) => {
      const pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        data[j].color = "black";
        data[high].color = "black";

        if (arr[j].data[0] < pivot.data[0]) {
          i++;
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;

          await new Promise((resolve) =>
            setTimeout(resolve, 1000 / animationSpeed)
          );

          setSeriesData([...arr]);
        }
      }

      const temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;

      arr[i + 1].color = getRandomColor();
      arr[high].color = getRandomColor();

      await new Promise((resolve) =>
        setTimeout(resolve, 1000 / animationSpeed)
      );

      setSeriesData([...arr]);

      return i + 1;
    };

    await quickSort(data, 0, data.length - 1);

    setDisabled(false);
  };

  // Function to animate the Merge Sort algorithm
  const animateMerge = async () => {
    setDisabled(true);
    const data = [...seriesData];

    if (checkSorted(data)) {
      setOpen(true);
      setDisabled(false);
      return;
    }
    const mergeSort = async (arr, left, right) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);

        await mergeSort(arr, left, mid);
        await mergeSort(arr, mid + 1, right);

        await merge(arr, left, mid, right);
      }
    };

    const merge = async (arr, left, mid, right) => {
      const n1 = mid - left + 1;
      const n2 = right - mid;

      const leftArray = new Array(n1);
      const rightArray = new Array(n2);

      for (let i = 0; i < n1; i++) {
        leftArray[i] = arr[left + i];
        leftArray[i].color = "black";
      }

      for (let j = 0; j < n2; j++) {
        rightArray[j] = arr[mid + 1 + j];
        rightArray[j].color = "black";
      }

      let i = 0;
      let j = 0;
      let k = left;

      while (i < n1 && j < n2) {
        if (leftArray[i].data[0] <= rightArray[j].data[0]) {
          arr[k] = leftArray[i];
          i++;
        } else {
          arr[k] = rightArray[j];
          j++;
        }
        k++;

        await new Promise((resolve) =>
          setTimeout(resolve, 1000 / animationSpeed)
        );
        setSeriesData([...arr]);
      }

      while (i < n1) {
        arr[k] = leftArray[i];
        i++;
        k++;

        await new Promise((resolve) =>
          setTimeout(resolve, 1000 / animationSpeed)
        );

        setSeriesData([...arr]);
      }

      while (j < n2) {
        arr[k] = rightArray[j];
        j++;
        k++;

        await new Promise((resolve) =>
          setTimeout(resolve, 1000 / animationSpeed)
        );

        setSeriesData([...arr]);
      }

      for (let i = left; i <= right; i++) {
        arr[i].color = getRandomColor();
      }
    };

    await mergeSort(data, 0, data.length - 1);

    setDisabled(false);
  };

  return (
    <Box>
      {open && (
        // Alert to inform the user if data is already sorted
        <Alert
          severity="warning"
          onClose={() => {
            setOpen(false);
          }}
          sx={{
            display: "flex",
          }}
        >
          The data is already sorted, please randomize the data to continue.
        </Alert>
      )}
      {/* Chart and animation speed slider */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Bar Chart */}
        <BarChart
          height={300}
          width={1000}
          axisHighlight={{
            x: "none",
            y: "none",
          }}
          series={seriesData}
          skipAnimation={false}
        />
        {/* Animation Speed Slider */}
        <Typography id="input-animation-speed" gutterBottom>
          Animation Speed (x)
        </Typography>
        <Slider
          value={animationSpeed}
          onChange={handleAnimationSpeed}
          valueLabelDisplay="auto"
          disabled={disabled}
          min={1}
          max={10}
          sx={{ width: "50%", marginBottom: "1rem" }}
          aria-labelledby="input-animation-speed"
        />
      </Box>
      {/* Buttons to randomize data and start sorting algorithms */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        {/* Button Group */}
        <ButtonGroup
          variant="contained"
          aria-label="Basic button group"
          sx={{
            marginBottom: "2.5rem",
          }}
        >
          <Button color="secondary" onClick={RandomizeData} disabled={disabled}>
            Randomize Data
          </Button>
          <Button onClick={animateInsertion} disabled={disabled}>
            Insertion Sort
          </Button>
          <Button onClick={animateSelection} disabled={disabled}>
            Selection Sort
          </Button>
          <Button onClick={animateBubble} disabled={disabled}>
            Bubble Sort
          </Button>
          <Button onClick={animateQuick} disabled={disabled}>
            Quick Sort
          </Button>
          <Button onClick={animateMerge} disabled={disabled}>
            Merge Sort
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
