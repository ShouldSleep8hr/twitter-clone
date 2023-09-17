import React, { useState } from 'react';
import "./Sidebar.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import PeopleIcon from '@material-ui/icons/People';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Button } from "@material-ui/core";

function Sidebar() {

  return (
    <div className="sidebar">
      <TwitterIcon className="sidebar__twitterIcon" />

      <SidebarOption active Icon={HomeIcon} text="หน้าแรก" />
      <SidebarOption Icon={SearchIcon} text="สำรวจ" />
      <SidebarOption Icon={NotificationsNoneIcon} text="การแจ้งเตือน" />
      <SidebarOption Icon={MailOutlineIcon} text="ข้อความ" />
      <SidebarOption Icon={ListAltIcon} text="รายชื่อ" />
      <SidebarOption Icon={PeopleIcon} text="ชุมชน" />
      <SidebarOption Icon={CheckCircleIcon} text="ยืนยันแล้ว" />
      <SidebarOption Icon={PermIdentityIcon} text="ข้อมูลส่วนตัว" />
      <SidebarOption Icon={MoreHorizIcon} text="เพิ่มเติม" />

      {/* Button -> Tweet */}
      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Tweet
      </Button>
    </div>
  );
}

export default Sidebar;