import React, { RefObject } from "react";
import {
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import TodayIcon from "@mui/icons-material/Today";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FullCalendar from "@fullcalendar/react";

interface SidebarProps {
	calendar: RefObject<FullCalendar>;
	isOpen: boolean;
	drawerWidth: number;
	openDialog: Function;
	isMobile: boolean;
}

const CalendarSidebar: React.FC<SidebarProps> = ({
	calendar,
	isOpen,
	drawerWidth,
	openDialog,
	isMobile,
}) => {
	const sidebarIcons = [
		{
			label: "Mese",
			component: <CalendarMonthIcon />,
			calendarView: "dayGridMonth",
			mobile: true,
		},
		{
			label: "Settimana",
			component: <CalendarViewWeekIcon />,
			calendarView: "timeGridWeek",
			mobile: false,
		},
		{
			label: "Giorno",
			component: <TodayIcon />,
			calendarView: "timeGridDay",
			mobile: true,
		},
	];

	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: drawerWidth,
					boxSizing: "border-box",
				},
			}}
			variant="persistent"
			anchor="left"
			open={isOpen}
		>
			<Divider
				sx={{
					marginTop: "30vh",
				}}
			/>
			<List>
				{sidebarIcons.map((entryMap) => {
					{
						if (isMobile && !entryMap.mobile) {
							return <></>;
						} else {
							return (
								<ListItem
									key={entryMap.label}
									disablePadding
									onClick={() => {
										calendar.current
											?.getApi()
											.changeView(entryMap.calendarView);
									}}
								>
									<ListItemButton>
										<ListItemIcon>{entryMap.component}</ListItemIcon>
										<ListItemText primary={entryMap.label} />
									</ListItemButton>
								</ListItem>
							);
						}
					}
				})}
				<Divider />
				<ListItem
					key="new-event"
					disablePadding
					onClick={() => {
						openDialog(undefined, undefined, undefined, undefined);
					}}
				>
					<ListItemButton>
						<ListItemIcon>
							<AddCircleOutlineIcon />
						</ListItemIcon>
						<ListItemText primary="Nuovo Evento" />
					</ListItemButton>
				</ListItem>
			</List>
		</Drawer>
	);
};

export default CalendarSidebar;
