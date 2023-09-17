import React from "react";
import "./Widgets.css";
import SearchIcon from '@material-ui/icons/Search';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Avatar,Button, List, ListItem,ListItemText } from "@material-ui/core";

function Widget() {

  return (
   <div className="widgets">
    {/* this is Widget */}
    {/* widget
        -searchbar
        -treading */}
        <div className="widgets-input">
          <SearchIcon className="widgets-searchIcon" />
          <input placeholder="ค้นหา" type="text" />      
        </div>

        <div className="widgets-sub">
          <h3>สมัครสมาชิก Premium</h3>
          <p>สมัครสมาชิกเพื่อปลดล็อคคุณสมบัติใหม่ และหากมีสิทธิ์ คุณก็จะได้รับส่วนแบ่งรายได้จากโฆษณา</p>
          <Button variant="contained">สมัครรับข้อมูล</Button>
        </div>

        <div className="widgets-trending">
          <h3>ความนิยมสำหรับคุณ</h3>
          <List>
                <ListItem button>
                  {/* <span>123</span> */}
                  <ListItemText
                    primary="#AABBCC"
                    secondary="99.99K posts"/>
                  <MoreHorizIcon />
                </ListItem>

                <ListItem button>
                  {/* <span>123</span> */}
                  <ListItemText
                    primary="#AABBCC"
                    secondary="99.99K posts"/>
                  <MoreHorizIcon />
                </ListItem>

                <ListItem button>
                  {/* <span>123</span> */}
                  <ListItemText
                    primary="#AABBCC"
                    secondary="99.99K posts"/>
                  <MoreHorizIcon />
                </ListItem>
            </List>
        </div>

        <div className="widgets-following">
          <h3>ติดตามใครดี</h3>
          <List>
                <ListItem >
                  <Avatar alt="srprottenmango" src="https://pbs.twimg.com/profile_images/1641773130279690240/4Qcrl-lP_400x400.jpg" />
                  <ListItemText
                    primary="srprottenmango"
                    secondary="@srprottenmango"/>
                  <Button variant="contained">ติดตาม</Button>
                </ListItem>

                <ListItem >
                  <Avatar alt="ShouldSleep8hr" src="https://avatars.githubusercontent.com/u/88647883?v=4" />
                  <ListItemText
                    primary="ShouldSleep8hr"
                    secondary="@ShouldSleep8hr"/>
                  <Button variant="contained">ติดตาม</Button>
                </ListItem>
            </List>
        </div>

    </div>
  );
}

export default Widget;