import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="50" >Sponsored</Typography>
                <Typography color={medium}>Create Ad</Typography>
            </FlexBetween>
            <img 
                width={"100%"}
                height={"auto"}
                alt="ADVERT_IMG"
                src="http://localhost:3001/assets/info4.jpeg"
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
            />
            <FlexBetween>
                <Typography color={main}>Sntaks Solutions</Typography>
                <Typography color={medium}>sntaks.com</Typography>
            </FlexBetween>
            <Typography color={medium}>
                Your gateway to xutting edge Software Solutions.
            </Typography>
        </WidgetWrapper>
    );
};

export default AdvertWidget;