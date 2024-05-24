import React from "react";
import { HighlightOffOutlined, UploadFileOutlined } from "@mui/icons-material";
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
import { useRef } from "react";
import axios from "axios";
import { useEffect } from "react";

export const PopUp = ({ open, data, onClose }) => {
  const [renderPopUp, setRenderPopUp] = React.useState("");
  const [activateSwitch, setActivateSwitch] = React.useState(true);
  const [date, setDate] = React.useState("");
  const [file, setFile] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [portion, setPortion] = React.useState("");

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
    // console.log(data);
    axios
      .get(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getBenefitParams?userId=" +
          user.userId +
          "&name=" +
          data.benefits,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        if (isEmpty(response.data) === false) {
          let name = data?.benefits?.toLowerCase();
          if (name?.includes("education")) {
            setReason(data.reason);
          } else if (name?.includes("401k")) {
            setPortion(data.portion);
          } else if (name?.includes("family care")) {
            setAmount(response.data.amount);
          } else if (name?.includes("commuter")) {
            setAmount(response.data.amount);
          } else if (name?.includes("immigration")) {
            visaRef.current.value = response.data.visa;
            gcRef.current.value = response.data.gc;
            otherRef.current.value = response.data.otherHelp;
          }
        }
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  }, []);

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
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
    // switch , date ,
    return (
      <div className="px-5">
        {/* switch */}
        <div className="grid grid-flow-col justify-between py-2">
          <p style={{ color: "#57595A" }}>
            Do you wish to activate
            <br /> the {data?.benefits}
          </p>
          <Switch
            checked={activateSwitch}
            onChange={(e) => setActivateSwitch(e.target.checked)}
            sx={{
              "&.MuiSwitch-root .Mui-checked": {
                color: "#729434",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#B1D570",
              },
            }}
          />
        </div>

        {/* Date  */}
        <div className="grid grid-flow-row py-2">
          <p style={{ color: "#57595A" }}>
            Effective starting date for the plan
          </p>
          <TextField
            type="date"
            size="small"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            sx={{ width: 280 }}
          />
        </div>

        {/* Button */}
        <div className="flex justify-center mt-4">
          <Button
            variant="outlined"
            style={{
              color: "#729434",
              borderColor: "#729434",
            }}
            onClick={() => {
              handleActivateBenefit(name.name, activateSwitch, data.cost);
            }}>
            Raise Request
          </Button>
        </div>
      </div>
    );
  };

  const SwitchTextFile = (name) => {
    // switch, text , file
    return (
      <div className="px-5">
        {/* switch */}
        <div className="grid grid-flow-col justify-between py-2">
          <p style={{ color: "#57595A" }}>Avail this benefit ($25 for month)</p>
          <Switch
            checked={activateSwitch}
            onChange={(e) => setActivateSwitch(e.target.checked)}
            sx={{
              "&.MuiSwitch-root .Mui-checked": {
                color: "#729434",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#B1D570",
              },
            }}
          />
        </div>

        {/* text Filed */}
        <div className="grid grid-flow-row py-2">
          <p style={{ color: "#57595A" }}>Enter Amount upto $2500</p>
          <TextField
            key="amount"
            size="small"
            autoFocus="autoFocus"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ width: 280 }}
          />
        </div>

        {/* upload */}
        <div className="grid grid-flow-row py-2">
          <p style={{ color: "#57595A" }}>Upload Relevant Documents</p>
          <Button
            component="label"
            variant="outlined"
            style={{
              color: "#729434",
              borderColor: "#729434",
              width: 280,
            }}
            startIcon={<UploadFileOutlined />}>
            Document
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              //accept="image/png, image/jpeg,image/jpg"
            />
          </Button>
          <p style={{ color: "#729434" }}>{file ? file.name : ""}</p>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-4">
          <Button
            variant="outlined"
            style={{
              color: "#729434",
              borderColor: "#729434",
            }}
            onClick={() => {
              handleSubmiWithFile(amount, name.name);
            }}>
            Raise Request
          </Button>
        </div>
      </div>
    );
  };

  const EducationDialog = (name) => {
    // text,file
    return (
      <div className="px-5">
        {/* text Filed */}
        <div className="grid grid-flow-row py-2">
          <p style={{ color: "#57595A" }}>
            Explain briefly why you want
            <br /> to claim the benefit
          </p>
          <TextField
            key="reason"
            size="small"
            autoFocus="autoFocus"
            sx={{ width: 280 }}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        {/* upload */}
        <div className="grid grid-flow-row py-2">
          <p style={{ color: "#57595A" }}>Upload Relevant Documents</p>
          <Button
            component="label"
            variant="outlined"
            style={{
              color: "#729434",
              borderColor: "#729434",
              width: 280,
            }}
            startIcon={<UploadFileOutlined />}>
            Document
            <VisuallyHiddenInput
              type="file"
              // accept="image/png, image/jpeg,image/jpg"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Button>
          <p style={{ color: "#729434" }}>{file ? file.name : ""}</p>
        </div>
        {/* Button */}
        <div className="flex justify-center mt-4">
          <Button
            variant="outlined"
            style={{
              color: "#729434",
              borderColor: "#729434",
            }}
            onClick={() => {
              handleSubmiWithFile(reason, name.name);
            }}>
            Raise Request
          </Button>
        </div>
      </div>
    );
  };

  const Kbenefits = (name) => {
    // switch , text
    return (
      <div className="px-5">
        {/* switch */}
        <div className="grid grid-flow-col justify-between py-2">
          <p style={{ color: "#57595A" }}>
            Available this benefit
            <br /> ($25 per mobth)
          </p>
          <Switch
            checked={activateSwitch}
            onChange={(e) => setActivateSwitch(e.target.checked)}
            sx={{
              "&.MuiSwitch-root .Mui-checked": {
                color: "#729434",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#B1D570",
              },
            }}
          />
        </div>
        {/* text Filed */}
        <div className="grid grid-flow-row py-2">
          <p style={{ color: "#57595A" }}>Your Portion (Upto 6%)</p>
          <TextField
            key="portion"
            size="small"
            autoFocus="autoFocus"
            value={portion}
            onChange={(e) => setPortion(e.target.value)}
            sx={{ width: 280 }}
          />
        </div>

        {/* Button */}
        <div className="flex justify-center mt-4">
          <Button
            variant="outlined"
            style={{
              color: "#729434",
              borderColor: "#729434",
            }}
            onClick={() => {
              handleSubmit(portion, name.name);
            }}>
            Raise Request
          </Button>
        </div>
      </div>
    );
  };

  const EmigrationDialog = (name) => {
    return (
      <div className="px-5">
        {/* switch */}
        <div className="grid grid-flow-col justify-between py-2">
          <p style={{ color: "#57595A" }}>
            Do you wish to activate
            <br /> the {data?.benefits}
          </p>
          <Switch
            checked={activateSwitch}
            onChange={(e) => setActivateSwitch(e.target.checked)}
            sx={{
              "&.MuiSwitch-root .Mui-checked": {
                color: "#729434",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#B1D570",
              },
            }}
          />
        </div>
        {/* text Filed */}
        <div className="grid grid-flow-row  py-2">
          <p style={{ color: "#57595A" }}>Visa</p>
          <TextField
            size="small"
            placeholder="Visa"
            inputRef={visaRef}
            sx={{ width: 280 }}
          />
        </div>

        {/* text Filed */}
        <div className="grid grid-flow-row py-2">
          <p style={{ color: "#57595A" }}>GC</p>
          <TextField
            size="small"
            placeholder="GC"
            inputRef={gcRef}
            sx={{ width: 280 }}
          />
        </div>

        {/* text Filed */}
        <div className="grid grid-flow-row py-2">
          <p style={{ color: "#57595A" }}>Other Help (Book an hour)</p>
          <TextField
            size="small"
            placeholder="Other Help"
            inputRef={otherRef}
            sx={{ width: 280 }}
          />
        </div>

        {/* Button */}
        <div className="flex justify-center mt-4">
          <Button
            variant="outlined"
            style={{
              color: "#729434",
              borderColor: "#729434",
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

  // handle submit

  const handleActivateBenefit = async (name, activate, cost) => {
    const user = JSON.parse(localStorage.getItem("token"));
    console.log(name, activate, cost, "---active Benefit");
    await axios
      .post(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/saveBenefit?userId=" +
          user.userId,
        {
          name,
          activate,
          cost,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((respsone) => {})
      .catch((error) => {
        console.log(error.message);
      });
    onClose();
  };

  // new added
  const handleSubmiWithFile = async (data, name) => {
    const user = JSON.parse(localStorage.getItem("token"));
    const formData = new FormData();
    formData.append("doc", file);
    formData.append("data", data);
    formData.append("name", name);
    console.log(file?.name, data, name, "---with file");
    await axios
      .post(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/saveBenefitwithDoc?userId=" +
          user.userId,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error("document save error:", error.message);
      });
    onClose();
  };

  // data some changes
  const handleSubmit = async (portion, name) => {
    const user = JSON.parse(localStorage.getItem("token"));

    console.log(portion, name, "---handleSubmit without file");

    await axios
      .get( 
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/save401kBenefit?userId=" +
          user.userId + "&portion="+portion+"&name="+name,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error("document save error:", error.message);
      });
    onClose();
  };

  const handleImmigrationSubmit = async (visa, gc, otherHelp, name) => {
    const user = JSON.parse(localStorage.getItem("token"));
    console.log(visa, gc, otherHelp, name, "---ImmiGration");
    await axios
      .post(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/saveImmigrationBenefit?userId=" +
          user.userId,
        { visa, gc, otherHelp, name },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error("document save error:", error.message);
      });
    onClose();
  };

  // which render run
  const RenderData = ({ render }) => {
    switch (render) {
      case "legal":
        return <DateSwithchDialog name={data.benefits} />; // handleActivateBenefit
      case "medical":
        return <DateSwithchDialog name={data.benefits} />;
      case "dental":
        return <DateSwithchDialog name={data.benefits} />;
      case "vision":
        return <DateSwithchDialog name={data.benefits} />;
      case "short":
        return <DateSwithchDialog name={data.benefits} />;
      case "long":
        return <DateSwithchDialog name={data.benefits} />;
      case "immigration/attorney":
        return <EmigrationDialog name={data.benefits} />; // handleImmigrationSubmit
      case "education":
        return <EducationDialog name={data.benefits} />; // handleSubmiWithFile
      case "401k":
        return <Kbenefits name={data.benefits} />; // handleSubmit
      case "family":
        return <SwitchTextFile name={data.benefits} />; // handleSubmiWithFile
      case "commuter":
        return <SwitchTextFile name={data.benefits} />; // handleSubmiWithFile
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
      aria-labelledby="responsive-dialog-title"
      PaperProps={{ sx: { borderRadius: "16px" } }}>
      <DialogContent>
        <div className="justify-center  text-center p-5">
          <DialogContentText
            sx={{ color: "black", fontWeight: "600", fontSize: 18 }}>
            {data?.benefits || ""}
          </DialogContentText>
        </div>
        {/* main Data */}
        <RenderData render={renderPopUp} />
        <div className="absolute right-3 top-3">
          <IconButton onClick={onClose}>
            <HighlightOffOutlined color="error" />
          </IconButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
