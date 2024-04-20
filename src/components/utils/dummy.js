import axios from "axios";

export const DummyData = [
  {
    id: 1,
    name: "timesheet1",
    from: "2021-08-15",
    tofrom: "2023-01-10",
    status: "Approved",
    hour: 8,
  },
  {
    id: 2,
    name: "timesheet2",
    from: "2024-05-18",
    tofrom: "2024-10-15",
    status: "Rejected",
    hour: 10,
  },
  {
    id: 3,
    name: "timesheet3",
    from: "2020-04-10",
    tofrom: "2022-04-10",
    status: "Open",
    hour: 9,
  },
  {
    id: 4,
    name: "timesheet4",
    from: "2023-02-26",
    tofrom: "2024-04-08",
    status: "Rejected",
    hour: 6,
  },
  {
    id: 5,
    name: "timesheet5",
    from: "2022-02-25",
    tofrom: "2023-07-05",
    status: "Open",
    hour: 8,
  },
  {
    id: 6,
    name: "timesheet6",
    from: "2024-05-18",
    tofrom: "2024-10-15",
    status: "Pending",
    hour: 8,
  },
];

export const get_Data = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/data/");

    if (response.status === 200) {
      console.log("data get successfully");
      return response;
    } else {
      console.log("data get failed");
      return "failed";
    }
  } catch (error) {
    console.error("data get error:", error.message);
    return error;
  }
};
