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
import { act } from "react-dom/test-utils";
import { useEffect } from "react";

export const PopUp = ({ open, data, onClose }) => {
  const [renderPopUp, setRenderPopUp] = React.useState("");
  const [activateSwitch, setActivateSwitch] = React.useState(true);
  const [date, setDate] = React.useState("");
  const [file, setFile] = React.useState("");
  const [doc, setDoc] = React.useState();
  const [benefitParams, setBenefitParams] = React.useState();
  const [reason, setReason] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [portion, setPortion] = React.useState("");
  const [visa, setVisa] = React.useState("");
  const [gc, setGc] = React.useState("");
  const [otherHelp, setOtherHelp] = React.useState("");

  let uptoRef = useRef("");
  let educationRef = useRef("");
  let KbenefitsRef = useRef("");
  const visaRef = useRef("");
  const gcRef = useRef("");
  const otherRef = useRef("");

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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    console.log(data);
    axios
      .get(
        "http://localhost:8080/xen/getBenefitParams?userId="+user.userId + "&name="+data.benefits,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        if(isEmpty(response.data) === false){
          let name = data?.benefits?.toLowerCase();
          if (name?.includes("education")) {
              setReason(data.reason)
          } else if (name?.includes("401k")) {
              setPortion(data.portion)
          } else if (name?.includes("family care")) {
              setAmount(response.data.amount)
          } else if (name?.includes("commuter")) {
              setAmount(response.data.amount);
          } else if(name?.includes("immigration")){
              setVisa(response.data.visa);
              setGc(response.data.gc);
              setOtherHelp(response.data.otherHelp);
          }
        }
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  }, []);


  function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  const setPopUp = () => {
    let name = data?.benefits?.toLowerCase();
    console.log(data);
    if (name?.includes("legal")) {
      setRenderPopUp("legal");
    } else if (name?.includes("medical")) {
      setRenderPopUp("medical");
    } else if (name?.includes("immigration/attorney")) {
      setRenderPopUp("immigration/attorney");
    } else if (name?.includes("dental")) {
      setRenderPopUp("dental");
    } else if (name?.includes("vision")) {
      setRenderPopUp("vision");
    } else if (name?.includes("short term")) {
      setRenderPopUp("short");
    } else if (name?.includes("long term")) {
      setRenderPopUp("long");
    } else if (name?.includes("education")) {
      setRenderPopUp("education");
    } else if (name?.includes("401k")) {
      setRenderPopUp("401k");
    } else if (name?.includes("family care")) {
      setRenderPopUp("family");
    } else if (name?.includes("commuter")) {
      setRenderPopUp("commuter");
    }
  };

  // Render Options
  const DateSwithchDialog = (name) => {
    return (
      <div>
        {/* switch */}
        <div className="grid grid-flow-col justify-between py-3">
          <lable>
            Do you wish to activate
            <br /> the {data?.benefits}
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
              handleActivateBenefit(name.name, date, activateSwitch,  data.cost);
            }}>
            Raise Request
          </Button>
        </div>
      </div>
    );
  };

  const SwitchTextFile = (name) => {
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
              //accept="image/png, image/jpeg,image/jpg"
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
              handleSubmit("", "",uptoRef.current.value, name.name);
            }}>
            Raise Request
          </Button>
        </div>
      </div>
    );
  };

  const EducationDialog = (name) => {
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
              // accept="image/png, image/jpeg,image/jpg"
              onChange={(e) => setFile(e.target.files[0])}
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
              handleSubmit(educationRef.current.value, 0, 0, name.name);
            }}>
            Raise Request
          </Button>
        </div>
      </div>
    );
  };

  const Kbenefits = (name) => {
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
            inputRef={KbenefitsRef}
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
              handleSubmit("", KbenefitsRef.current.value, 0, name.name);
            }}>
            Raise Request
          </Button>
        </div>
      </div>
    );
  };

  const EmigrationDialog = (name) => {
    return (
      <div>
        {/* switch */}
        <div className="grid grid-flow-col justify-between py-3">
          <lable>
            Do you wish to activate
            <br /> the {data?.benefits}
          </lable>
          <Switch
            checked={activateSwitch}
            onChange={(e) => setActivateSwitch(e.target.checked)}
            color="success"
          />
        </div>
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
              handleImmigrationSubmit(
                visaRef.current.value,
                gcRef.current.value,
                otherRef.current.value,
                name.name
              )
            }>
            Raise Request
          </Button>
        </div>
      </div>
    );
  };


  const handleActivateBenefit = async(name, date, activate, cost) => {
    const user = JSON.parse(localStorage.getItem("token"));
    await axios.post("http://localhost:8080/xen/saveBenefit?userId="+user.userId, {
        name,
        activate,
        date,
        cost
      },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then(respsone => {

      })
      .catch(error => {
        console.log(error.message);
      })
  }
  // handle submit
  const handleSubmit = async (reason, portion, amount,name) => {
    const formData = new FormData();
    formData.append("doc", file);
    formData.append("reason", reason);
    formData.append("portion", portion);
    formData.append("amount", amount);
    formData.append("name", name);

    const user = JSON.parse(localStorage.getItem("token"));
    await axios
      .post(
        "http://localhost:8080/xen/saveBenefitwithDoc?userId=" +user.userId,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {

      })
      .catch((error) => {
        console.error("document save error:", error.message);
      });
      onClose();
  };

  const handleImmigrationSubmit = async (visa, gc, otherHelp, name) => {

    const user = JSON.parse(localStorage.getItem("token"));
    await axios
      .post(
        "http://localhost:8080/xen/saveImmigrationBenefit?userId=" +user.userId,
         { visa, gc, otherHelp, name },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {

      })
      .catch((error) => {
        console.error("document save error:", error.message);
      });
      onClose();
  };

  // which render run
  const RenderData = ({ render }) => {
    switch (render) {
      case "legal":
        return <DateSwithchDialog name={data.benefits}/>;
      case "medical":
        return <DateSwithchDialog name={data.benefits}/>;
      case "immigration/attorney":
        return <EmigrationDialog name={data.benefits}/>;
      case "dental":
        return <DateSwithchDialog name={data.benefits}/>;
      case "vision":
        return <DateSwithchDialog name={data.benefits}/>;
      case "short":
        return <DateSwithchDialog name={data.benefits}/>;
      case "long":
        return <DateSwithchDialog name={data.benefits}/>;
      case "education":
        return <EducationDialog name={data.benefits}/>;
      case "401k":
        return <Kbenefits name={data.benefits} />;
      case "family":
        return <SwitchTextFile name={data.benefits} />;
      case "commuter":
        return <SwitchTextFile name={data.benefits} />;
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
            {data?.benefits || ""}
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
