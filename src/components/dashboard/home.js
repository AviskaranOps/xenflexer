import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { RadioButtonChecked } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { My_Experience } from "./my_experience";
import { My_Information } from "./my_information";
import { Upload_Document } from "./upload_document";
import { Volantary_Disclosures } from "./volantary_disclosures";

const steps = [
  "My Information",
  "My Experience",
  "Upload Documents",
  "Voluntary Disclosures",
];

export function Home() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const Show_Fragment = () => {
    switch (activeStep) {
      case 0:
        return <My_Information next={handleNext} />;
      case 1:
        return <My_Experience next={handleNext} />;
      case 2:
        return <Upload_Document next={handleNext} />;
      case 3:
        return <Volantary_Disclosures />;
      default:
        break;
    }
  };

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#53783B",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#53783B",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#568ec9",
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "#53783B",
      zIndex: 1,
      fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  }));

  function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <RadioButtonChecked color="success" />
        ) : (
          <RadioButtonChecked />
        )}
      </QontoStepIconRoot>
    );
  }

  return (
    <div className="pb-20">
      <div className="py-10">
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          connector={<QontoConnector />}>
          {steps.map((label, index) => {
            const labelProps = {};

            if (index === 0) {
              labelProps.optional = (
                <Typography variant="caption" sx={{ color: "#7B964A" }}>
                  Name and Email
                </Typography>
              );
            }
            if (index === 1) {
              labelProps.optional = (
                <Typography variant="caption" sx={{ color: "#7B964A" }}>
                  Your Experiences
                </Typography>
              );
            }
            if (index === 2) {
              labelProps.optional = (
                <Typography variant="caption" sx={{ color: "#7B964A" }}>
                  Start Collaborating
                </Typography>
              );
            }
            if (index === 3) {
              labelProps.optional = (
                <Typography variant="caption" sx={{ color: "#7B964A" }}>
                  Automatic Sharing
                </Typography>
              );
            }

            return (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon} {...labelProps}>
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>

      {/* <React.Fragment>
        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}>
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {isStepOptional(activeStep) && (
            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
              Skip
            </Button>
          )}

          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </React.Fragment> */}
      <div>
        <Show_Fragment />
      </div>
    </div>
  );
}
