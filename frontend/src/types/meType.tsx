export type Me = {
  'country': string;
  'display_name': string;
  'email': string;
  'explicit_content': {
    'filter_enabled': true;
    'filter_locked': true;
  };
  'external_urls': {
    'spotify': string;
  };
  'followers': {
    'href': string;
    'total': number;
  };
  'href': string;
  'id': string;
  'images': [
    {
      'url': string;
      'height': number;
      'width': number;
    }
  ];
  'product': string;
  'type': string;
  'uri': string;
};
