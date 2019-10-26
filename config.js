const Confidence = require('confidence');

const criteria = {
  env: process.env.NODE_ENV
};

var config = {
  $meta: 'FITCO Shop Middleware.',
  projectName: 'fitco-shop-middleware',
  staticFile: {
    $filter: 'env',
    production: 'https://shop.api.fitco.id',
    staging: 'https://staging.shop.api.fitco.id',
    dev: 'https://dev.shop.api.fitco.id',
    local: 'http://localhost:5000',
    $default: 'http://localhost:5000'
  },
  bearerToken: {
    $filter: 'env',
    production:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjE0MWVhZWY3MzZjZjA2NzUzYjE4NzQ3ZmRiNjE3NGViYzRhYmQzZWE4NTg2NDA1MDZkZWNkZDdlNzhhZDZhZjNlNTcyYjM4ZGJhNTU1MGU0In0.eyJhdWQiOiI5IiwianRpIjoiMTQxZWFlZjczNmNmMDY3NTNiMTg3NDdmZGI2MTc0ZWJjNGFiZDNlYTg1ODY0MDUwNmRlY2RkN2U3OGFkNmFmM2U1NzJiMzhkYmE1NTUwZTQiLCJpYXQiOjE1Njk4OTcxMDgsIm5iZiI6MTU2OTg5NzEwOCwiZXhwIjoxNjAxNTE5NTA4LCJzdWIiOiIxMjY0OTUiLCJzY29wZXMiOltdfQ.TnoqCeEVHl_3SZ5qgZ5HCzrkPfYV6yYZJlBYI0pzavIQ9xS6Us2fTVOgP4gFROV0bnejQJ-EfsQz_2XCLLc-4ZLaU-M5KjKnUs2aRdADizjchP62pqvdCTPLNFX493UajmeoWArzVdcHUw6PMWyQlHbo98CeFjPLcPiHoPYw5FAV7FXD1m68HWJaIrx9x1KM6u7kgvndVQnH99QlgjwfRsi_TZx2TDQCPUuSqKsSIqIq6TG-bBaw-K01Efhzg1kmNtnEq1ZDxn3LSz_2e2qwF-PR0hgu-lLJn5EA6o9GkU2sdmSgaYYc8w3hRv6UbBerdoniAPemu1BFyhO-iX6Lvh2zvi1SCmTFgmlLqz8UJmFQa9d0RF3KbGTXvIFQZcJ5SveLFhyfCWVTGO-PAlki9PAnWR3TDFNNxCWBAT4y4ioMtCEkyTAbf9bMvAQ_7DRBFRFcTmn1eWw4ZZmh3dGuyuPbqh-N81B08dEUDN-enHEvYK-wqPK6QlVg1NNkhHD-HzEvpYSpqFQht7XQ9Ewkr2kABYC5krE5G0-gDJF0rQBSUoVEbDuYONo4IW36k0DK1uqWe8CdbdY25PM_Gkv9HoeO-FJOsNJyxiWCsOmojT8S5T9uHVIXVtxj54JrTFiR2dyquQWtPBOuGai0rXLVIzlhoPRsB-gLUAVI-BvqmFk',
    staging:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJmNGIyNDdkZTRjZTc1MzY1ZDQ0YzA3YjI5YWE5MzMyY2U1YjBkMDkyMjNhNzQ3ZmIzNWFmODRkOTFmYjIyY2Q2MmNiNTliZTkxNzFhZTkwIn0.eyJhdWQiOiI1IiwianRpIjoiMmY0YjI0N2RlNGNlNzUzNjVkNDRjMDdiMjlhYTkzMzJjZTViMGQwOTIyM2E3NDdmYjM1YWY4NGQ5MWZiMjJjZDYyY2I1OWJlOTE3MWFlOTAiLCJpYXQiOjE1NTA3MTYxMTMsIm5iZiI6MTU1MDcxNjExMywiZXhwIjoxNTgyMjUyMTEzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.J5XHMHvXQ9sRpVOqzWKjZTxP05sgDuqzZpbS8caI5ZN1sK9XZhDk56sclFR1BoRm46xSCXCB4TMQQdRJ1kVwAjuhAhwfHv0Mex7T4Ct_wrvFZbltuKkQ9gsV-HS7lUcq2zfAQWW65TrosplqwtM4n3J9lALeyVU5vS0I3NR46QNHrQjusneuNAutpXC9fBXTuAongxhQ-VEr4IanCrObbgDjEZPS8bDEXO7Zi6K_laOWMQSZYLCKXpt4zvIJqL-8s0NSoWwu_i9WVhrpdM5401iZdL_r4md2Ejz3BSOeAyxW2wEO89kGPHvayGgEcpXJadsdfrn8mQhAfhLinLzEJablsexDKKJ6xhI_g3S2e_06TITf6gn7_RJLKxyM3_PkX4J2Q3usAn2M3_r1_hpHVwTizu0gK3c6986LlRPiUq5pdhnW3RXPzatIOiKNwMW-A2BgLRSR6Aedi7NoRHW_5SdF0ZiylmPSVhqvMsr6x9IQG3JInRAFXSW6vtdlzwq3rS_6yJW1JoBW1ZCxv85HAodiWfjmNo5S9IaiIJaWFGbtEwTQ47nnknL__XT0NSuAC_egdT49xa5HnxsxtD2d1TIew0VyXmjZlkL6YSfn4oHbrzazrarAM52de_g6v50rKY9mL02zXtrNiMuifP-sSGAFTndg4834-z30onKMdMM',
    dev:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJmNGIyNDdkZTRjZTc1MzY1ZDQ0YzA3YjI5YWE5MzMyY2U1YjBkMDkyMjNhNzQ3ZmIzNWFmODRkOTFmYjIyY2Q2MmNiNTliZTkxNzFhZTkwIn0.eyJhdWQiOiI1IiwianRpIjoiMmY0YjI0N2RlNGNlNzUzNjVkNDRjMDdiMjlhYTkzMzJjZTViMGQwOTIyM2E3NDdmYjM1YWY4NGQ5MWZiMjJjZDYyY2I1OWJlOTE3MWFlOTAiLCJpYXQiOjE1NTA3MTYxMTMsIm5iZiI6MTU1MDcxNjExMywiZXhwIjoxNTgyMjUyMTEzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.J5XHMHvXQ9sRpVOqzWKjZTxP05sgDuqzZpbS8caI5ZN1sK9XZhDk56sclFR1BoRm46xSCXCB4TMQQdRJ1kVwAjuhAhwfHv0Mex7T4Ct_wrvFZbltuKkQ9gsV-HS7lUcq2zfAQWW65TrosplqwtM4n3J9lALeyVU5vS0I3NR46QNHrQjusneuNAutpXC9fBXTuAongxhQ-VEr4IanCrObbgDjEZPS8bDEXO7Zi6K_laOWMQSZYLCKXpt4zvIJqL-8s0NSoWwu_i9WVhrpdM5401iZdL_r4md2Ejz3BSOeAyxW2wEO89kGPHvayGgEcpXJadsdfrn8mQhAfhLinLzEJablsexDKKJ6xhI_g3S2e_06TITf6gn7_RJLKxyM3_PkX4J2Q3usAn2M3_r1_hpHVwTizu0gK3c6986LlRPiUq5pdhnW3RXPzatIOiKNwMW-A2BgLRSR6Aedi7NoRHW_5SdF0ZiylmPSVhqvMsr6x9IQG3JInRAFXSW6vtdlzwq3rS_6yJW1JoBW1ZCxv85HAodiWfjmNo5S9IaiIJaWFGbtEwTQ47nnknL__XT0NSuAC_egdT49xa5HnxsxtD2d1TIew0VyXmjZlkL6YSfn4oHbrzazrarAM52de_g6v50rKY9mL02zXtrNiMuifP-sSGAFTndg4834-z30onKMdMM',
    local:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJmNGIyNDdkZTRjZTc1MzY1ZDQ0YzA3YjI5YWE5MzMyY2U1YjBkMDkyMjNhNzQ3ZmIzNWFmODRkOTFmYjIyY2Q2MmNiNTliZTkxNzFhZTkwIn0.eyJhdWQiOiI1IiwianRpIjoiMmY0YjI0N2RlNGNlNzUzNjVkNDRjMDdiMjlhYTkzMzJjZTViMGQwOTIyM2E3NDdmYjM1YWY4NGQ5MWZiMjJjZDYyY2I1OWJlOTE3MWFlOTAiLCJpYXQiOjE1NTA3MTYxMTMsIm5iZiI6MTU1MDcxNjExMywiZXhwIjoxNTgyMjUyMTEzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.J5XHMHvXQ9sRpVOqzWKjZTxP05sgDuqzZpbS8caI5ZN1sK9XZhDk56sclFR1BoRm46xSCXCB4TMQQdRJ1kVwAjuhAhwfHv0Mex7T4Ct_wrvFZbltuKkQ9gsV-HS7lUcq2zfAQWW65TrosplqwtM4n3J9lALeyVU5vS0I3NR46QNHrQjusneuNAutpXC9fBXTuAongxhQ-VEr4IanCrObbgDjEZPS8bDEXO7Zi6K_laOWMQSZYLCKXpt4zvIJqL-8s0NSoWwu_i9WVhrpdM5401iZdL_r4md2Ejz3BSOeAyxW2wEO89kGPHvayGgEcpXJadsdfrn8mQhAfhLinLzEJablsexDKKJ6xhI_g3S2e_06TITf6gn7_RJLKxyM3_PkX4J2Q3usAn2M3_r1_hpHVwTizu0gK3c6986LlRPiUq5pdhnW3RXPzatIOiKNwMW-A2BgLRSR6Aedi7NoRHW_5SdF0ZiylmPSVhqvMsr6x9IQG3JInRAFXSW6vtdlzwq3rS_6yJW1JoBW1ZCxv85HAodiWfjmNo5S9IaiIJaWFGbtEwTQ47nnknL__XT0NSuAC_egdT49xa5HnxsxtD2d1TIew0VyXmjZlkL6YSfn4oHbrzazrarAM52de_g6v50rKY9mL02zXtrNiMuifP-sSGAFTndg4834-z30onKMdMM',
    $default:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJmNGIyNDdkZTRjZTc1MzY1ZDQ0YzA3YjI5YWE5MzMyY2U1YjBkMDkyMjNhNzQ3ZmIzNWFmODRkOTFmYjIyY2Q2MmNiNTliZTkxNzFhZTkwIn0.eyJhdWQiOiI1IiwianRpIjoiMmY0YjI0N2RlNGNlNzUzNjVkNDRjMDdiMjlhYTkzMzJjZTViMGQwOTIyM2E3NDdmYjM1YWY4NGQ5MWZiMjJjZDYyY2I1OWJlOTE3MWFlOTAiLCJpYXQiOjE1NTA3MTYxMTMsIm5iZiI6MTU1MDcxNjExMywiZXhwIjoxNTgyMjUyMTEzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.J5XHMHvXQ9sRpVOqzWKjZTxP05sgDuqzZpbS8caI5ZN1sK9XZhDk56sclFR1BoRm46xSCXCB4TMQQdRJ1kVwAjuhAhwfHv0Mex7T4Ct_wrvFZbltuKkQ9gsV-HS7lUcq2zfAQWW65TrosplqwtM4n3J9lALeyVU5vS0I3NR46QNHrQjusneuNAutpXC9fBXTuAongxhQ-VEr4IanCrObbgDjEZPS8bDEXO7Zi6K_laOWMQSZYLCKXpt4zvIJqL-8s0NSoWwu_i9WVhrpdM5401iZdL_r4md2Ejz3BSOeAyxW2wEO89kGPHvayGgEcpXJadsdfrn8mQhAfhLinLzEJablsexDKKJ6xhI_g3S2e_06TITf6gn7_RJLKxyM3_PkX4J2Q3usAn2M3_r1_hpHVwTizu0gK3c6986LlRPiUq5pdhnW3RXPzatIOiKNwMW-A2BgLRSR6Aedi7NoRHW_5SdF0ZiylmPSVhqvMsr6x9IQG3JInRAFXSW6vtdlzwq3rS_6yJW1JoBW1ZCxv85HAodiWfjmNo5S9IaiIJaWFGbtEwTQ47nnknL__XT0NSuAC_egdT49xa5HnxsxtD2d1TIew0VyXmjZlkL6YSfn4oHbrzazrarAM52de_g6v50rKY9mL02zXtrNiMuifP-sSGAFTndg4834-z30onKMdMM'
  },
  padawanApi: {
    $filter: 'env',
    production: 'https://api.fitco.id',
    staging: 'https://staging.api.fitco.id',
    dev: 'https://dev.api.fitco.id',
    local: 'https://dev.api.fitco.id',
    $default: 'https://dev.api.fitco.id'
  },
  mysqlConnection: {
    $filter: 'env',
    production: {
      host: 'fitco-staging.cz8ywgnyqpoq.ap-southeast-1.rds.amazonaws.com',
      user: 'fit2go',
      password: '6UYNd&8xPy9pT4wq',
      database: 'fitco_shop',
      port: 3306
    },
    staging: {
      host: 'fitco-staging.cz8ywgnyqpoq.ap-southeast-1.rds.amazonaws.com',
      user: 'fit2go',
      password: '6UYNd&8xPy9pT4wq',
      database: 'fitco_shop',
      port: 3306
    },
    dev: {
      host:
        'twentyfitdevelopment.cz8ywgnyqpoq.ap-southeast-1.rds.amazonaws.com',
      user: 'fitcodev',
      password: 'zb38v5FpAY',
      database: 'fitco_shop',
      port: 3306
    },
    local: {
      host: '127.0.0.1',
      user: 'root',
      password: 'password',
      database: 'fitco_shop',
      port: 3306
    },
    $default: {
      host: '127.0.0.1',
      user: 'root',
      password: 'password',
      database: 'fitco_shop',
      port: 3306
    }
  },
  swaggerOptions: {
    info: {
      title: 'FITCO SHOP API Documentation',
      version: '1.0.0'
    },
    tags: [
      {
        name: 'Categories',
        description: 'shop categories api'
      },
      {
        name: 'Product',
        description: 'shop product api'
      },
      {
        name: 'Static File',
        description: 'static file api'
      }
    ],
    grouping: 'tags'
  },
  secretKey: {
    $filter: 'env',
    production: 'fitco-prod-secret-1234',
    staging: 'fitco-staging-secret-1234',
    dev: 'fitco-dev-secret-1234',
    local: 'fitcoo-local-secret-1234',
    $default: 'fitco-local-secret-1234'
  },
  stubAuthToken: {
    iss: 'fitco-app',
    sub: 'sms|58258a8f1bea6c60b0e82483',
    aud: 'LdzZ0UbENNMFycNgkNLhSZH4NjEiDeT0',
    username: 'tester@fitco.id',
    password: 'Fitco123'
  },
  fitmartHost: {
    $filter: 'env',
    production: 'https://fitmart.co.id/',
    staging: 'https://fitmart.co.id/',
    dev: 'https://fitmart.co.id/',
    local: 'http://localhost:8000',
    $default: 'http://localhost:8000'
  },
  fitmartApiKey: {
    $filter: 'env',
    production: {
      consumerKey: 'ck_4b74e619f040bae0e7839069d7b7a9822066baad',
      consumerSecret: 'cs_038c5c2796a0e1428c3eeb6c582f9d551c3fa9cb'
    },
    staging: {
      consumerKey: 'ck_2dcd27b4dfd239d3350b3187fa6881ee04e8eb99',
      consumerSecret: 'cs_0ebf9ba06004ce26534e0b2b7705d0800e619039'
    },
    dev: {
      consumerKey: 'ck_2dcd27b4dfd239d3350b3187fa6881ee04e8eb99',
      consumerSecret: 'cs_0ebf9ba06004ce26534e0b2b7705d0800e619039'
    },
    local: {
      consumerKey: 'ck_2dcd27b4dfd239d3350b3187fa6881ee04e8eb99',
      consumerSecret: 'cs_0ebf9ba06004ce26534e0b2b7705d0800e619039'
    },
    $default: {
      consumerKey: 'ck_2dcd27b4dfd239d3350b3187fa6881ee04e8eb99',
      consumerSecret: 'cs_0ebf9ba06004ce26534e0b2b7705d0800e619039'
    }
  }
};

var store = new Confidence.Store(config);

exports.get = function(key) {
  return store.get(key, criteria);
};

exports.meta = function(key) {
  return store.meta(key, criteria);
};
