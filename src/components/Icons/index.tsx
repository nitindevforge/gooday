import React from "react";
import { IconsProps } from "./type";
import Google from "./Google";
import Apple from "./Apple";
import Mail from "./Mail";
import Edit from "./Edit";
import Close from "./Close";
import Dots from "./Dots";
import Back from "./Back";
import EyeHide from "./EyeHide";
import EyeShow from "./EyeShow";
import Home from "./Home";
import BulletList from "./BulletList";
import Compose from "./Compose";
import Walk from "./Walk";
import Beer from "./Beer";
import Cafe from "./Cafe";
import Laptop from "./Laptop";
import Restaurant from "./Restaurant";
import GoogleCalendar from "./GoogleCalendar";
import OutlookCalendar from "./OutlookCalendar";
import Add from "./Add";
import ImageAdd from "./ImageAdd";
import Search from "./Search";
import Mic from "./Mic";
import RightArrow from "./RightArrow";
import Info from "./Info";
import Check from "./Check";
import { Delete } from "./Delete";
import CheckMark from "./CheckMark";
import QRCode from "./QRCode";
import Camera from "./Camera";
import DownArrow from "./DownArrow";
import Cloud from "./Cloud";
import Bell from "./Bell";
import FireAlt from "./FireAlt";
import Settings from "./Settings";
import User from "./User";
import { Time } from "./Time";
import { Heart } from "./Heart";
import { Users } from "./Users";
import { CircleDots } from "./CircleDots";
import Location from "./Location";
import Star from "./Star";
import Chevron from "./Chevron";
import Contact from "./Contact";
import Lock from "./Lock";
import Swap from "./Swap";
import Help from "./Help";
import Feedback from "./Feedback";
import ProfilePolicy from "./ProfilePolicy";
import InfoLine from "./InfoLine";
import Notification from "./Notification";
import Toggle from "./Toggle";
import Plus from "./Plus";
import MonthView from "./MonthView";
import { FillFavorite } from "./fillFavorite";
import Eclipse from "./Elipse";
import Gym from "./Gym";
import Yoga from "./Yoga";
import Health from "./Health";
import Eye from "./Eye";
import Dish from "./Dish";
import HotCafe from "./HotCafe";
import Run from "./Run";
import Swimming from "./Swimming";
import Car from "./Car";
import Nail from "./Nail";
import Hair from "./Hair";
import Spa from "./Spa";
import Trades from "./Trades";
import Travel from "./Travel";
import Hotel from "./Hotel";
import Birthday from "./Birthday";
import Party from "./Party";
import Art from "./Art";
import Movies from "./Movies";
import Music from "./Music";
import Game from "./Game";
import Work from "./Work";
import Wedding from "./Wedding";
import Hangout from "./Hangout";
import Book from "./Book";
import Date from "./Date";
import Business from "./Business";
import Bills from "./Bills";
import Shopping from "./Shopping";
import Photography from "./Photography";
import Export from "./Export";
import Countdown from "./Countdown";
import { MenuIcon } from "./Menu";
import { Todo } from "./Todo";
import { CalendarIcon } from "./Calendar";
import { Note } from "./Note";
import { Profile } from "./Profile";
import { Running } from "./Running";
import NotificationBell from "./NotificationBell";
import Map from "./Map";
import LocationMark from "./LocationMark";
import Dollar from "./Dollar";
import AddCircle from "./Add-circle";
import MinusCircle from "./Minus-cirlce";
import Website from "./Call";
import Call from "./Website";
import Exclamation from "./Exclamation";
import AddImage from "./AddImage";
import AddRound from "./AddRound";
import ChartBoard from "./ChartBoard";

export const Icons: React.FC<IconsProps> = ({ name, ...rest }) => {
  switch (name) {
    case "running":
      return <Running {...rest} />;
    case "menu":
      return <MenuIcon {...rest} />;
    case "google":
      return <Google {...rest} />;
    case "apple":
      return <Apple {...rest} />;
    case "mail":
      return <Mail {...rest} />;
    case "edit":
      return <Edit {...rest} />;
    case "close":
      return <Close {...rest} />;
    case "dots":
      return <Dots {...rest} />;
    case "back":
      return <Back {...rest} />;
    case "eye-hide":
      return <EyeHide {...rest} />;
    case "eye-show":
      return <EyeShow {...rest} />;
    case "home":
      return <Home {...rest} />;
    case "bullet-list":
      return <BulletList {...rest} />;
    case "calendar":
      return <CalendarIcon {...rest} />;
    case "google-calendar":
      return <GoogleCalendar {...rest} />;
    case "outlook-calendar":
      return <OutlookCalendar {...rest} />;
    case "compose":
      return <Compose {...rest} />;
    case "walk":
      return <Walk {...rest} />;
    case "beer":
      return <Beer {...rest} />;
    case "cafe":
      return <Cafe {...rest} />;
    case "laptop":
      return <Laptop {...rest} />;
    case "restaurant":
      return <Restaurant {...rest} />;
    case "add":
      return <Add {...rest} />;
    case "image-add":
      return <ImageAdd {...rest} />;
    case "search":
      return <Search {...rest} />;
    case "mic":
      return <Mic {...rest} />;
    case "right-arrow":
      return <RightArrow {...rest} />;
    case "info":
      return <Info {...rest} />;
    case "check":
      return <Check {...rest} />;
    case "delete":
      return <Delete {...rest} />;
    case "check-mark":
      return <CheckMark {...rest} />;
    case "qr-code":
      return <QRCode {...rest} />;
    case "camera":
      return <Camera {...rest} />;
    case "down-arrow":
      return <DownArrow {...rest} />;
    case "cloud":
      return <Cloud {...rest} />;
    case "bell":
      return <Bell {...rest} />;
    case "fire-alt":
      return <FireAlt {...rest} />;
    case "settings":
      return <Settings {...rest} />;
    case "user":
      return <User {...rest} />;
    case "time":
      return <Time {...rest} />;
    case "heart":
      return <Heart {...rest} />;
    case "users":
      return <Users {...rest} />;
    case "circle-dots":
      return <CircleDots {...rest} />;
    case "profile":
      return <Profile {...rest} />;
    case "location":
      return <Location {...rest} />;
    case "star":
      return <Star {...rest} />;
    case "chevron":
      return <Chevron {...rest} />;
    case "lock":
      return <Lock {...rest} />;
    case "swap":
      return <Swap {...rest} />;
    case "help":
      return <Help {...rest} />;
    case "contact":
      return <Contact {...rest} />;
    case "feedback":
      return <Feedback {...rest} />;
    case "profile-policy":
      return <ProfilePolicy {...rest} />;
    case "info-line":
      return <InfoLine {...rest} />;
    case "notification":
      return <Notification {...rest} />;
    case "toggle":
      return <Toggle {...rest} />;
    case "plus":
      return <Plus {...rest} />;
    case "month-view":
      return <MonthView {...rest} />;
    case "fill-favorite":
      return <FillFavorite {...rest} />;
    case "eclipse":
      return <Eclipse {...rest} />;
    case "gym":
      return <Gym {...rest} />;
    case "yoga":
      return <Yoga {...rest} />;
    case "health":
      return <Health {...rest} />;
    case "eye":
      return <Eye {...rest} />;
    case "dish":
      return <Dish {...rest} />;
    case "hot-cafe":
      return <HotCafe {...rest} />;
    case "run":
      return <Run {...rest} />;
    case "swimming":
      return <Swimming {...rest} />;
    case "car":
      return <Car {...rest} />;
    case "nail":
      return <Nail {...rest} />;
    case "hair":
      return <Hair {...rest} />;
    case "spa":
      return <Spa {...rest} />;
    case "trades":
      return <Trades {...rest} />;
    case "travel":
      return <Travel {...rest} />;
    case "hotel":
      return <Hotel {...rest} />;
    case "birthday":
      return <Birthday {...rest} />;
    case "party":
      return <Party {...rest} />;
    case "art":
      return <Art {...rest} />;
    case "movies":
      return <Movies {...rest} />;
    case "music":
      return <Music {...rest} />;
    case "game":
      return <Game {...rest} />;
    case "work":
      return <Work {...rest} />;
    case "wedding":
      return <Wedding {...rest} />;
    case "date":
      return <Date {...rest} />;
    case "hangout":
      return <Hangout {...rest} />;
    case "book":
      return <Book {...rest} />;
    case "trip":
      return <Work {...rest} />;
    case "photography":
      return <Photography {...rest} />;
    case "shopping":
      return <Shopping {...rest} />;
    case "bills":
      return <Bills {...rest} />;
    case "business":
      return <Business {...rest} />;
    case "export":
      return <Export {...rest} />;
    case "count-down":
      return <Countdown {...rest} />;
    case "todo":
      return <Todo {...rest} />;
    case "note":
      return <Note {...rest} />;
    case "notification-bell":
      return <NotificationBell {...rest} />;
    case "map":
      return <Map {...rest} />;
    case "location-mark":
      return <LocationMark {...rest} />;
    case "dollar":
      return <Dollar {...rest} />;
    case "add-circle":
      return <AddCircle {...rest} />;
    case "minus-circle":
      return <MinusCircle {...rest} />;
    case "website":
      return <Website {...rest} />;
    case "call":
      return <Call {...rest} />;
    case "exclamation":
      return <Exclamation {...rest} />;
    case "add-image":
      return <AddImage {...rest} />;
    case "exclamation":
      return <Exclamation {...rest} />;
    case "add-round":
      return <AddRound {...rest} />;
      case "chart-board":
      return <ChartBoard {...rest} />;
  }
};
