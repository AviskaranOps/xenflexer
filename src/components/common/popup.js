import React from "react";
import { CloseOutlined, UploadFileOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  IconButton,
  Switch,
  TextField,
  styled,
} from "@mui/material";
import check from "../../assets/images/check-icon.png";
import { useRef } from "react";
import axios from "axios";

export const PopUp = ({ open, data, onClose }) => {
  const [renderPopUp, setRenderPopUp] = React.useState("");
  const [activateSwitch, setActivateSwitch] = React.useState(true);
  const [date, setDate] = React.useState("");
  const [file, setFile] = React.useState("");
  let uptoRef = useRef("");
  let educationRef = useRef("");
  let KBenifitsRef = useRef("");
  let visaRef = useRef("");
  let gcRef = useRef("");
  let otherRef = useRef("");

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const setPopUp = () => {
    let name = data?.benifits.toLowerCase();
    if (name.includes("legal")) {
      setRenderPopUp("legal");
    } else if (name.includes("medical")) {
      setRenderPopUp("medical");
    } else if (name.includes("immigration/attorney")) {
      setRenderPopUp("immigration/attorney");
    } else if (name.includes("dental")) {
      setRenderPopUp("dental");
    } else if (name.includes("vision")) {
      setRenderPopUp("vision");
    } else if (name.includes("short term")) {
      setRenderPopUp("short");
    } else if (name.includes("long term")) {
      setRenderPopUp("long");
    } else if (name.includes("education")) {
      setRenderPopUp("education");
    } else if (name.includes("401k")) {
      setRenderPopUp("401k");
    } else if (name.includes("family care")) {
      setRenderPopUp("family");
    } else if (name.includes("commuter")) {
      setRenderPopUp("commuter");
    }
  };

  // Render Options
  const DateSwithchDialog = () => {
    return (
      <div>
        {/* switch */}
        <div className="grid grid-flow-col justify-between py-3">
          <lable>
            Do you wish to activate
            <br /> the {data?.benifits}
          </lable>
          <Switch
            checked={activateSwitch}
            onChange={(e) => setActivateSwitch(e.target.checked)}
            color="success"
          />
        </div>

        {/* Date  */}
        <div className="grid grid-flow-col justify-between py-3">
          <lable>
            Effective starting date
            <br /> for the plan
          </lable>
          <TextField
            type="date"
            size="small"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            sx={{ width: 150, marginLeft: 6 }}
          />
        </div>

        {/* Button */}
        <div className="flex justify-center mt-4">
          <Button
            variant="outlined"
            style={{
              color: "#344054",
              borderColor: "#D0D5DD",
            }}
            onClick={() => {
              handleSubmit(activateSwitch, date);
            }}>
            Raise Request
          </Button>
        </div>
      </div>
    );
  };

  const SwitchTextFile = () => {
    return (
      <div>
        {/* switch */}
        <div className="grid grid-flow-col justify-between py-3">
          <lable>Avail this benefit ($25 for month)</lable>
          <Switch
            checked={activateSwitch}
            onChange={(e) => setActivateSwitch(e.target.checked)}
            color="success"
          />
        </div>

        {/* text Filed */}
        <div className="grid grid-flow-col justify-between py-3">
          <lable>Enter Amount upto $2500</lable>
          <TextField
            size="small"
            inputRef={uptoRef}
            sx={{ width: 150, marginLeft: 6 }}
          />
        </div>

        {/* upload */}
        <div className="grid grid-flow-col justify-between py-3">
          <lable>
            Upload Relevant
            <br /> Documents
          </lable>
          <Button
            component="label"
            variant="outlined"
            style={{
              color: "#344054",
              borderColor: "#D0D5DD",
              width: 150,
            }}
            startIcon={<UploadFileOutlined />}>
            Document
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/png, image/jpeg,image/jpg"
            />
          </Button>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-4">
          <Button
            variant="outlined"
            style={{
              color: "#344054",
              borderColor: "#D0D5DD",
            }}
            onClick={() => {
              handleSubmit(uptoRef.current.value, activateSwitch, file);
            }}>
            Raise Request
          </Button>
        </div>
      </div>
    );
  };

  const EducationDialog = () => {
    return (
      <div>
        {/* text Filed */}
        <div className="grid grid-flow-col justify-between py-3">
          <lable>
            Explain briefly why you want
            <br /> to claim the benefit
          </lable>
          <TextField
            size="small"
            inputRef={educationRef}
            sx={{ width: 150, marginLeft: 6 }}
          />
        </div>

        {/* upload */}
        <div className="grid grid-flow-col justify-between py-3">
          <lable>
            Upload Relevant
            <br /> Documents
          </lable>
          <Button
            component="label"
            variant="outlined"
            style={{
              color: "#344054",
              borderColor: "#D0D5DD",
              width: 150,
            }}
            startIcon={<UploadFileOutlined />}>
            Document
            <VisuallyHiddenInput
              type="file"
              accept="image/png, image/jpeg,image/jpg"
            />
          </Button>
        </div>
        {/* Button */}
        <div className="flex justify-center mt-4">
          <Button
            variant="outlined"
            style={{
              color: "#344054",
              borderColor: "#D0D5DD",
            }}
            onClick={() => {
              handleSubmit(educationRef.current.value, file);
            }}>
            Raise Request
          </Button>
        </div>
      </div>
    );
  };

  const KBenifits = () => {
    return (
      <div>
        {/* switch */}
        <div className="grid grid-flow-col justify-between py-3">
          <lable>
            Available this benefit
            <br /> ($25 per mobth)
          </lable>
          <Switch
            checked={activateSwitch}
            onChange={(e) => setActivateSwitch(e.target.checked)}
            color="success"
          />
        </div>
        {/* text Filed */}
        <div className="grid grid-flow-col justify-between py-3">
          <lable>Your Portion (Upto 6%)</lable>
          <TextField
            size="small"
            inputRef={KBenifitsRef}
            sx={{ width: 150, marginLeft: 6 }}
          />
        </div>

        {/* Button */}
        <div className="flex justify-center mt-4">
          <Button
            variant="outlined"
            style={{
              color: "#344054",
              borderColor: "#D0D5DD",
            }}
            onClick={() => {
              handleSubmit(KBenifitsRef.current.value, activateSwitch);
            }}>
            Raise Request
          </Button>
        </div>
      </div>
    );
  };

  const EmigrationDialog = () => {
    return (
      <div>
        {/* text Filed */}
        <div className="grid grid-flow-col justify-between py-3">
          <lable>Visa</lable>
          <TextField
            size="small"
            inputRef={visaRef}
            sx={{ width: 150, marginLeft: 6 }}
          />
        </div>

        {/* text Filed */}
        <div className="grid grid-flow-col justify-between py-3">
          <lable>GC</lable>
          <TextField
            size="small"
            inputRef={gcRef}
            sx={{ width: 150, marginLeft: 6 }}
          />
        </div>

        {/* text Filed */}
        <div className="grid grid-flow-col justify-between py-3">
          <lable>Other Help (Book an hour)</lable>
          <TextField
            size="small"
            inputRef={otherRef}
            sx={{ width: 150, marginLeft: 6 }}
          />
        </div>

        {/* Button */}
        <div className="flex justify-center mt-4">
          <Button
            variant="outlined"
            style={{
              color: "#344054",
              borderColor: "#D0D5DD",
            }}
            onClick={() =>
              handleSubmit(
                visaRef.current.value,
                gcRef.current.value,
                otherRef.current.value
              )
            }>
            Raise Request
          </Button>
        </div>
      </div>
    );
  };

  // handle submit
  const handleSubmit = async (data1, data2, data3) => {
    console.log(data1, data2, data3);
    try {
      const response = await axios.post("http://localhost:3000/api/popup/", {
        data1,
        data2,
        data3,
      });

      if (response.status === 200) {
        console.log("addtimesheet save successfully");
      } else {
        console.log("addtimesheet save failed");
      }
    } catch (error) {
      console.error("addtimesheet save error:", error.message);
    }
  };

  // which render run
  const RenderData = ({ render }) => {
    switch (render) {
      case "legal":
        return <DateSwithchDialog />;
      case "medical":
        return <DateSwithchDialog />;
      case "immigration/attorney":
        return <EmigrationDialog />;
      case "dental":
        return <DateSwithchDialog />;
      case "vision":
        return <DateSwithchDialog />;
      case "short":
        return <DateSwithchDialog />;
      case "long":
        return <DateSwithchDialog />;
      case "education":
        return <EducationDialog />;
      case "401k":
        return <KBenifits />;
      case "family":
        return <SwitchTextFile />;
      case "commuter":
        return <SwitchTextFile />;
      default:
        break;
    }
  };

  React.useEffect(() => {
    setPopUp();
  }, [data]);

  return (
    <Dialog
      open={open}
      // onClose={onClose}
      aria-labelledby="responsive-dialog-title">
      <DialogContent>
        <div className="flex justify-center pt-5">
          <img src={check} alt="dialog icon" width={50} />
        </div>
        <div className="justify-center  text-center p-5">
          <DialogContentText
            sx={{ color: "black", fontWeight: "600", fontSize: 22 }}>
            {data?.benifits || ""}
          </DialogContentText>
        </div>
        {/* main Data */}
        <RenderData render={renderPopUp} />
        <div className="absolute right-3 top-3">
          <IconButton onClick={onClose}>
            <CloseOutlined />
          </IconButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
