import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { My_Experience } from "./my_experience";
import { My_Information } from "./my_information";
import { Upload_Document } from "./upload_document";
import { Volantary_Disclosures } from "./volantary_disclosures";
import { My_Education } from "./my_education";
import { SideNavProfile } from "../widgets/sidenavProfile";
import congrates from "../../assets/Congrats.png";

const steps = [
  "Basic Information",
  "Work Experience",
  "Qualification",
  "Upload Documents",
  "Voluntary Disclosures",
];

export function Home() {
  const location = useLocation();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  React.useEffect(() => {
    setActiveStep(location.state ? location.state : 0);
  }, []);

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  const Show_Fragment = () => {
    switch (activeStep) {
      case 0:
        return <My_Information next={handleNext} />;
      case 1:
        return <My_Experience next={handleNext} back={handleBack} />;
      case 2:
        return <My_Education next={handleNext} back={handleBack} />;
      case 3:
        return <Upload_Document next={handleNext} back={handleBack} />;
      case 4:
        return <Volantary_Disclosures back={handleBack} next={handleNext} />;
      default:
        break;
    }
  };

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 20,
      left: "calc(-40% + 16px)",
      right: "calc(60% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#729434",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#729434",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled("div")(({ ownerState }) => ({
    background: "#CACACA",
    zIndex: 1,
    color: "white",
    width: 40,
    height: 40,
    display: "flex",
    borderColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    opacity: 0.3,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 3,
    ...(ownerState.active && {
      opacity: 1,
      background: "#729434",
    }),
    ...(ownerState.completed && {
      opacity: 1,
      background: "#729434",
    }),
  }));

  function QontoStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
      1: <span style={{ fontSize: 25 }}>1</span>,
      2: <span style={{ fontSize: 25 }}>2</span>,
      3: <span style={{ fontSize: 25 }}>3</span>,
      4: <span style={{ fontSize: 25 }}>4</span>,
      5: <span style={{ fontSize: 25 }}>5</span>,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  return (
    <div className="min-h-screen bg-app-lightBlue flex">
      <SideNavProfile />
      <div className="w-full">
        <div className="mt-20 pl-10 py-5">
          {pathSegments.map((segment, index) => (
            <span
              key={index}
              className={`text-xl font-semibold ${
                index === 0 ? "text-app-gray" : "text-app-gray900"
              }`}>
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
              {index < pathSegments.length - 1 && " / "}
            </span>
          ))}
        </div>
        {activeStep === 5 ? (
          <div className="grid grid-flow-row  mt-16 justify-center text-center">
            <div className="flex justify-center items-center">
              <img src={congrates} alt="congrates image" width={177} />
            </div>
            <p style={{ color: "#5A5A5A", fontSize: 20 }}>
              Your Application has been <br /> successfully submitted
            </p>
          </div>
        ) : (
          <div className="pb-20 px-10">
            <Card sx={{ borderRadius: 5, py: 3 }}>
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                connector={<QontoConnector />}>
                {steps.map((label, index) => {
                  return (
                    <Step key={label}>
                      <StepLabel
                        onClick={() => setActiveStep(index)}
                        StepIconComponent={QontoStepIcon}>
                        {label}
                      </StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </Card>
            <div>
              <Show_Fragment />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
