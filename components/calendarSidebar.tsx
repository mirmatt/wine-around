
import React from 'react'
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import TodayIcon from '@mui/icons-material/Today';



export default function CalendarSidebar({setCalendar}) {

    const sidebarIcons = [
        {
            "label" : "month",
            "component" : <CalendarMonthIcon/>,
            "calendarView" : "dayGridMonth"
        },
        {
            "label" : "week",
            "component" : <CalendarViewWeekIcon/>,
            "calendarView" : "timeGridWeek"
        },
        {
            "label" : "day",
            "component" : <TodayIcon/>,
            "calendarView" : "timeGridDay"
        },
    ]
    
    return (
        <Drawer
                sx={{
                    width: 240,
                    flexShrink: 0
                }}
                variant='permanent'
                anchor='left'
            >
                <List>
                    {sidebarIcons.map((entryMap) => {
                        return (<ListItem key={entryMap.label} disablePadding onClick={() => {
                                setCalendar(entryMap.calendarView)
                            }}>
                          <ListItemButton>
                            <ListItemIcon>
                                {entryMap.component}
                            </ListItemIcon>
                            <ListItemText primary={entryMap.label}/>
                          </ListItemButton>
                        </ListItem>)
                    })}
                </List>
            </Drawer>
    )
}