
import React, {RefObject} from 'react'
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import TodayIcon from '@mui/icons-material/Today';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FullCalendar from "@fullcalendar/react";

interface SidebarProps {
    calendar: RefObject<FullCalendar>,
    isOpen: boolean,
    drawerWidth: number,
    openDialog: Function
}

const CalendarSidebar:React.FC<SidebarProps> = ({calendar, isOpen, drawerWidth, openDialog}) => {

    const sidebarIcons = [
        {
            "label" : "Mese",
            "component" : <CalendarMonthIcon/>,
            "calendarView" : "dayGridMonth"
        },
        {
            "label" : "Settimana",
            "component" : <CalendarViewWeekIcon/>,
            "calendarView" : "timeGridWeek"
        },
        {
            "label" : "Giorno",
            "component" : <TodayIcon/>,
            "calendarView" : "timeGridDay"
        },
    ]
    
    return (
        <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                      width: drawerWidth,
                      boxSizing: 'border-box',
                    },
                  }}
                variant='persistent'
                anchor='left'
                open={isOpen}
            >
                <List>
                    {sidebarIcons.map((entryMap) => {
                        return (<ListItem key={entryMap.label} disablePadding onClick={() => {
                                calendar.current?.getApi().changeView(entryMap.calendarView)
                            }}>
                          <ListItemButton>
                            <ListItemIcon>
                                {entryMap.component}
                            </ListItemIcon>
                            <ListItemText primary={entryMap.label}/>
                          </ListItemButton>
                        </ListItem>)
                    })}
                    <Divider/>
                    <ListItem key="new-event" disablePadding onClick={() => {
                        openDialog(
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                        )
                    }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddCircleOutlineIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Nuovo Evento"/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
    )
}

export default CalendarSidebar