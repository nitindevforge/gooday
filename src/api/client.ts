import {
  AppService,
  AssistantService,
  AuthService,
  BookingService,
  BusinessService,
  DeviceService,
  EventService,
  FileService,
  FriendsService,
  GoalsService,
  GoogleService,
  IntegrationService,
  LocationService,
  MicrosoftService,
  NotificationService,
  OAuthService,
  PaymentService,
  PlansService,
  PrepaidService,
  TagsService,
  TodoService,
  UsersService,
  WaitListService,
  WhatsOnService,
} from "@app/api";
import { CalendarService } from "./services/Calendar";

export default class ApiClient {
  static get Auth() {
    return new AuthService();
  }
  static get Users() {
    return new UsersService();
  }
  static get Todo() {
    return new TodoService();
  }
  static get App() {
    return new AppService();
  }
  static get Goals() {
    return new GoalsService();
  }
  static get Plans() {
    return new PlansService();
  }
  static get AssistantAI() {
    return new AssistantService();
  }
  static get Device() {
    return new DeviceService();
  }
  static get Oauth() {
    return new OAuthService();
  }
  static get Business() {
    return new BusinessService();
  }

  static get File() {
    return new FileService();
  }

  static get Google() {
    return new GoogleService();
  }

  static get Microsoft() {
    return new MicrosoftService();
  }

  static get Payment() {
    return new PaymentService();
  }

  static get Integration() {
    return new IntegrationService();
  }

  static get Location() {
    return new LocationService();
  }

  static get Friends() {
    return new FriendsService();
  }

  static get Notification() {
    return new NotificationService();
  }
  static get Booking() {
    return new BookingService();
  }
  static get Calendar() {
    return new CalendarService();
  }
  static get Event() {
    return new EventService()
  }
  static get PrepaidService() {
    return new PrepaidService()
  }
  static get Waitlist() {
    return new WaitListService()
  }
  static get WhatsOn() {
    return new WhatsOnService()
  }
  static get Tag() {
    return new TagsService()
  }
}
