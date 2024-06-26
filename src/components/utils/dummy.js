import axios from "axios";

export const DummyData = [
  {
    id: 1,
    name: "timesheet1",
    from: "2021-08-15",
    tofrom: "2023-01-10",
    status: "Approved",
    hour: 8,
    timesheet: "timeshhet",
    email: "abc@123.com",
  },
  {
    id: 2,
    name: "timesheet2",
    from: "2024-05-18",
    tofrom: "2024-10-15",
    status: "Rejected",
    hour: 10,
    timesheet: "timeshhet",
    email: "abc@123.com",
  },
  {
    id: 3,
    name: "timesheet3",
    from: "2020-04-10",
    tofrom: "2022-04-10",
    status: "Open",
    hour: 9,
    timesheet: "timeshhet",
    email: "abc@123.com",
  },
  {
    id: 4,
    name: "timesheet4",
    from: "2023-02-26",
    tofrom: "2024-04-08",
    status: "Rejected",
    hour: 6,
    timesheet: "timeshhet",
    email: "abc@123.com",
  },
  {
    id: 5,
    name: "timesheet5",
    from: "2022-02-25",
    tofrom: "2023-07-05",
    status: "Open",
    hour: 8,
    timesheet: "timeshhet",
    email: "abc@123.com",
  },
  {
    id: 6,
    name: "timesheet6",
    from: "2024-05-18",
    tofrom: "2024-10-15",
    status: "Pending",
    hour: 8,
    timesheet: "timeshhet",
    email: "abc@123.com",
  },
  {
    id: 7,
    name: "timesheet1",
    from: "2021-08-15",
    tofrom: "2023-01-10",
    status: "Approved",
    hour: 8,
    timesheet: "timeshhet",
    email: "abc@123.com",
  },
  {
    id: 8,
    name: "timesheet3",
    from: "2020-04-10",
    tofrom: "2022-04-10",
    status: "Open",
    hour: 9,
    timesheet: "timeshhet",
    email: "abc@123.com",
  },
  {
    id: 9,
    name: "timesheet4",
    from: "2023-02-26",
    tofrom: "2024-04-08",
    status: "Rejected",
    hour: 6,
    timesheet: "timeshhet",
    email: "abc@123.com",
  },
  {
    id: 10,
    name: "timesheet5",
    from: "2022-02-25",
    tofrom: "2023-07-05",
    status: "Open",
    hour: 8,
    timesheet: "timeshhet",
    email: "abc@123.com",
  },
  {
    id: 11,
    name: "timesheet6",
    from: "2024-05-18",
    tofrom: "2024-10-15",
    status: "Pending",
    hour: 8,
    timesheet: "timeshhet",
    email: "abc@123.com",
  },
  {
    id: 12,
    name: "timesheet2",
    from: "2024-05-18",
    tofrom: "2024-10-15",
    status: "Rejected",
    hour: 10,
    timesheet: "timeshhet",
    email: "abc@123.com",
  },
  {
    id: 13,
    name: "timesheet6",
    from: "2024-05-18",
    tofrom: "2024-10-15",
    status: "Pending",
    hour: 8,
    timesheet: "timeshhet",
    email: "abc@123.com",
  },
  {
    id: 14,
    name: "timesheet1",
    from: "2021-08-15",
    tofrom: "2023-01-10",
    status: "Approved",
    hour: 8,
    timesheet: "timeshhet",
    email: "abc@123.com",
  },
  {
    id: 15,
    name: "timesheet3",
    from: "2020-04-10",
    tofrom: "2022-04-10",
    status: "Open",
    hour: 9,
    timesheet: "timeshhet",
    email: "abc@123.com",
  },
  {
    id: 16,
    name: "timesheet4",
    from: "2023-02-26",
    tofrom: "2024-04-08",
    status: "Rejected",
    hour: 6,
    timesheet: "timeshhet",
    email: "abc@123.com",
  },
  {
    id: 17,
    name: "timesheet5",
    from: "2022-02-25",
    tofrom: "2023-07-05",
    status: "Open",
    hour: 8,
    timesheet: "timeshhet",
    email: "abc@123.com",
  },
  {
    id: 18,
    name: "timesheet6",
    from: "2024-05-18",
    tofrom: "2024-10-15",
    status: "Pending",
    hour: 8,
    timesheet: "timeshhet",
    email: "abc@123.com",
  },
  {
    id: 19,
    name: "timesheet2",
    from: "2024-05-18",
    tofrom: "2024-10-15",
    status: "Rejected",
    hour: 10,
    timesheet: "timeshhet",
    email: "abc@123.com",
  },
  {
    id: 20,
    name: "timesheet2",
    from: "2024-05-18",
    tofrom: "2024-10-15",
    status: "Rejected",
    hour: 10,
    timesheet: "timeshhet",
    email: "abc@123.com",
  },
];

export const Dummy_Approval = [
  {
    timesheetName: "t1",
    startDate: "2024-04-01",
    endDate: "2024-04-15",
    status: "reject",
  },
  {
    timesheetName: "t2",
    startDate: "2024-04-01",
    endDate: "2024-04-15",
    status: "approved",
  },
  {
    timesheetName: "t3",
    startDate: "2024-04-01",
    endDate: "2024-04-15",
    status: "approved",
  },
  {
    timesheetName: "t4",
    startDate: "2024-04-01",
    endDate: "2024-04-15",
    status: "reject",
  },
];

export const Dummy_Pending = [
  {
    timesheetName: "T1",
    date: "2024-04-01",
    workingHours: 8,
    status: "reject", // input drop down list
  },
  {
    timesheetName: "T2",
    date: "2024-04-02",
    workingHours: 8,
    status: "approve", // input drop down list
  },
  {
    timesheetName: "T3",
    date: "2024-04-03",
    workingHours: 8,
    status: "reject", // input drop down list
  },
  {
    timesheetName: "T4",
    date: "2024-04-04",
    workingHours: 8,
    status: "reject", // input drop down list
  },
  {
    timesheetName: "T5",
    date: "2024-04-05",
    workingHours: 8,
    status: "approve", // input drop down list
  },
  {
    timesheetName: "T6",
    date: "2024-04-06",
    workingHours: 8,
    status: "approve", // input drop down list
  },
  {
    timesheetName: "T7",
    date: "2024-04-07",
    workingHours: 8,
    status: "approve", // input drop down list
  },
  {
    timesheetName: "T8",
    date: "2024-04-07",
    workingHours: 8,
    status: "reject", // input drop down list
  },
  {
    timesheetName: "T9",
    date: "2024-04-08",
    workingHours: 8,
    status: "reject", // input drop down list
  },
  {
    timesheetName: "T10",
    date: "2024-04-09",
    workingHours: 8,
    status: "reject", // input drop down list
  },
  {
    timesheetName: "T11",
    date: "2024-04-10",
    workingHours: 8,
    status: "reject", // input drop down list
  },
  {
    timesheetName: "T12",
    date: "2024-04-11",
    workingHours: 8,
    status: "reject", // input drop down list
  },
  {
    timesheetName: "T13",
    date: "2024-04-12",
    workingHours: 8,
    status: "reject", // input drop down list
  },
  {
    timesheetName: "T14",
    date: "2024-04-13",
    workingHours: 8,
    status: "reject", // input drop down list
  },
  {
    timesheetName: "T15",
    date: "2024-04-14",
    workingHours: 8,
    status: "reject", // input drop down list
  },
  {
    timesheetName: "T16",
    date: "2024-04-15",
    workingHours: 8,
    status: "reject", // input drop down list
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

export const Dummy_benefits = [
  {
    benefits: "Immigration/Attorney Help ",
    status: "Active",
    effectiveDate: "2024-04-01",
    cost: "20",
  },
  {
    benefits: "Legal Plan  ",
    status: "Processing",
    effectiveDate: "2024-08-01",
    cost: "26",
  },
  {
    benefits: "Medical plan ",
    status: "InActive",
    effectiveDate: "2025-01-20",
    cost: "13",
  },
  {
    benefits: "Dental ",
    status: "Active",
    effectiveDate: "2024-04-01",
    cost: "27",
  },
  {
    benefits: "Immigration/Attorney Help ",
    status: "Active",
    effectiveDate: "2023-08-01",
    cost: "20",
  },
  {
    benefits: "Legal Plan ",
    status: "Active",
    effectiveDate: "2024-10-18",
    cost: "22",
  },
  {
    benefits: "Vision ",
    status: "Processing",
    effectiveDate: "2024-04-01",
    cost: "24",
  },
  {
    benefits: "Vision plan",
    status: "Active",
    effectiveDate: "2022-04-21",
    cost: "20",
  },
  {
    benefits: "Short Term",
    status: "InActive",
    effectiveDate: "2022-04-21",
    cost: "20",
  },
  {
    benefits: "Long Term",
    status: "InActive",
    effectiveDate: "2022-04-21",
    cost: "20",
  },
  {
    benefits: "Vision plan",
    status: "Active",
    effectiveDate: "2022-04-21",
    cost: "20",
  },
  {
    benefits: "Education benefits",
    status: "Processing",
    effectiveDate: "2024-04-01",
    cost: "24",
  },
  {
    benefits: "401k benefits",
    status: "Active",
    effectiveDate: "2025-06-30",
    cost: "20",
  },
  {
    benefits: "Child & Family Care",
    status: "InActive",
    effectiveDate: "2025-06-30",
    cost: "20",
  },
  {
    benefits: "401k benefits",
    status: "InActive",
    effectiveDate: "2025-06-30",
    cost: "20",
  },
  {
    benefits: "Commuter Benefits ",
    status: "Processing",
    effectiveDate: "2024-04-01",
    cost: "25",
  },
  {
    benefits: "Dental ",
    status: "Processing",
    effectiveDate: "2026-01-10",
    cost: "20",
  },
  {
    benefits: "Commuter Benefits ",
    status: "Active",
    effectiveDate: "2024-12-01",
    cost: "18",
  },
];

export const Dummy_Payroll = [
  { type: "Flexer Share", amount: 100, lastUpdate: "2024-04-01" },
  { type: "Flexer Recognized Share", amount: 100, lastUpdate: "2024-04-01" },
  { type: "Current Payroll Amount", amount: 100, lastUpdate: "2024-04-01" },
  { type: "Next Payroll Amount", amount: 100, lastUpdate: "2024-04-01" },
  { type: "Pre Payment Payroll Amount", amount: 100, lastUpdate: "2024-04-01" },
  { type: "Pre Payment Locator", amount: 100, lastUpdate: "2024-04-01" },
  {
    type: "Forecast with next Payroll Amount",
    amount: 100,
    lastUpdate: "2024-04-01",
  },
];
