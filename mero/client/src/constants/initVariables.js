exports.signupInit = {
  usr: {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    contactNumber: '',
    displayAddress: '',
    userType: '',
  },
  err: {
    firstname: false,
    lastname: false,
    email: false,
    password: false,
    contactNumber: false,
    displayAddress: false,
    userType: false,
  },
  status: {
    state: false,
    title: '',
    message: '',
  },
};

exports.loginInit = {
  usr: {
    email: '',
    password: '',
  },
  err: {
    email: false,
    password: false,
  },
  status: {
    state: false,
    title: '',
    message: '',
  },
};

exports.user = [
  { label: 'admin', value: 'admin' },
  { label: 'buyer', value: 'buyer' },
  { label: 'seller', value: 'seller' },
];

exports.endpoint = 'http://localhost:5000/api/signup';
