import { useState, RefObject } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import CalendarSidebar from "./CalendarSidebar";
import FullCalendar from "@fullcalendar/react";

interface HeaderProps {
	calendarRef: RefObject<FullCalendar>;
	openDialog: Function;
	isMobile: boolean;
}

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const HeaderMenu: React.FC<HeaderProps> = ({ calendarRef, openDialog, isMobile }) => {
	const theme = useTheme();
	const [menuVisibility, setVisibilityMenu] = useState(false);
	const drawerWidth = 220;

	const AppBar = styled(MuiAppBar, {
		shouldForwardProp: (prop) => prop !== "open",
	})<AppBarProps>(({ theme, open }) => ({
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeIn,
			duration: theme.transitions.duration.leavingScreen,
		}),
		...(open && {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: `${drawerWidth}px`,
			transition: theme.transitions.create(["margin", "width"], {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
		}),
	}));

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" theme={theme} open={menuVisibility}>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={() => {
							setVisibilityMenu(!menuVisibility);
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Calendario
					</Typography>
				</Toolbar>
			</AppBar>
			<CalendarSidebar
				calendar={calendarRef}
				isOpen={menuVisibility}
				drawerWidth={drawerWidth}
				openDialog={openDialog}
				isMobile={isMobile}
			></CalendarSidebar>
		</Box>
	);
};

export default HeaderMenu;
