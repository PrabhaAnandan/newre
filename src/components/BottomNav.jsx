// import { History, Dashboard, LocalActivity, Person} from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BottomNav(props){

    const [value,setValue] = useState();
    const navigate = useNavigate();
    return(
        <Paper className="bottom-nav-cont" sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation className="bottom-nav"
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            const paths = props.navPaths;
            // const paths = ["/home", "/passhome", "/history", "/profile"];
            navigate(paths[newValue]);
          }}
        >
          <BottomNavigationAction className="bottom-nav-btn" label={props.navLabels[0]} icon={props.navIcons[0]}/>
          <BottomNavigationAction className="bottom-nav-btn" label={props.navLabels[1]} icon={props.navIcons[1]} />
          <BottomNavigationAction className="bottom-nav-btn" label={props.navLabels[2]} icon={props.navIcons[2]} />
          <BottomNavigationAction className="bottom-nav-btn" label={props.navLabels[3]} icon={props.navIcons[3]} />
        </BottomNavigation>
      </Paper>
    )
}