export enum Role {
  PERSONAL = 'user',
  BUSINESS = 'business',
}

export enum USER_ACTION {
  BASIC_INFO = 'basic_info',
  NICK_NAME = 'nick_name',
  DOB = 'dob',
  ASSISTANT = 'assistant',
  GOALS = 'goals',
  PLAN = 'plan',
  MAIL_VERIFICATION = 'verify_email',
  BUSINESS_TIME = 'business_time',
  BUSINESS_ADDITIONAL_INFO = 'business_additional_info',
  BUSINESS_DETAILS = 'business_details',
  BUSINESS_CONFIRMATION = 'business_confirmation',
  INTEGRATION = 'integration'
}

export const Gender = [
  {
    value: 'male',
    label: 'Male'
  },
  {
    value: 'female',
    label: 'Female'
  },
  {
    value: 'non-binary',
    label: 'Non-Binary'
  },
  {
    value: 'I’d rather not say',
    label: 'I’d rather not say'
  }
]