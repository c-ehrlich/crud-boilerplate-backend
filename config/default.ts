// This uses the `config` module
// Under no circumstances should you use the included keypair.
// They only exist to allow a quick test deployment.

export default {
  port: 1337,
  dbUri: 'mongodb://localhost:27017/rest-api-tutorials',
  saltWorkFactor: 10,
  accessTokenTtl: '15m', // Time to live
  refreshTokenTtl: '1y',
  publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtN6HXoHq04U7xT+cQsy+
hppTenT42SGTaCc0665yDo82PSNniBaeiCGhO/ARVgehz/WknVRm68+wcF/VQ1Ob
8dLIQsyBFJaRWn53jwKD1gV/M+84wdsWPhJbl7QdkHRI3OSzZ+K5+YK5o4yIzwb+
IAUdERLaSYflbjuUM/Q1/bfaYtd9SjyV5/veOBeLFSRc0SZHlM/xCXFvy+0pgdhp
xWDme/A7Y3MCoDBqyHP1Di/YkDiqFj+f639GgyrXnktSLo8bJ/lEo/yATptoepUJ
woFliF7MvO0wdDrdvIqo/Bm8cHaGM8P3toLeULMxV06apHGx6Z5hwe8Lvr2KGK05
yQIDAQAB
-----END PUBLIC KEY-----`,
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
Proc-Type: 4,ENCRYPTED
DEK-Info: DES-EDE3-CBC,796E03C77BDFB6A4

S3lpKUakI+rXdI/JQy9Yz+Rd1aXgbtxT5dqoIlNrKQ11aXqCuFYnQjGueg27l4qF
GpJtUWIBPlLoVh4ZXEJIUDKq7AJHUuuGo0zx3jcQgUs8OCqnOPCN3yh402SEspqy
R/w5ZrY2WHtbf60S2GO66yegNozvlNU0yvniWyCiQd64UjiI1YS67BvSQAWQqZMB
7kZxPnlZtQPyvFNXJE3Lq9cEgiYpaSwXMcnN5pi0bQuXFfbYwjDogmqkb3zIItDn
VXh2V1A4UUdYaJXYBsG5PUpgbYK/pKUtyiTTT03vKRTOVS+DPB7IxTgradTe5VXA
s+xxpn2aNCIll82KVyR+GQaObH//tCptHMN1Qa8941Z72AhEyMgGnlbNsLGWFy2r
PbqFy1JDXimbjzhQnPCggiRafOgph6po4cNcbnovXt4F4GADM8wxnRyBHIZZgQJj
2oUQ3rEmVoXNQyswmc4h+YNMeJky93Gdqw5GhZjDfgjDf/TLfpCUzIXShUbuhS00
4oMD3MSpSmh5/O8QnSp3CB9ptwzVAtfS8U9bJTuGqiIb9WMC/eTd84mIL88LYVTC
TbGGdocVLrTeAvXjr5U/RqpidoDFimMw/Qb6K3PUyfpfqSIW7THDv4br/XANnCZ3
Q+8IGQ/YS0yxBO82l8AB+GiPxcMCvuY7JawMkPwvATUTWqJnEpTZ8GNmYVsYcjbv
ZKqHqPc/BUu8wuH/Oxd/6ki8rWVV4Y9FkQBXc9XfwznNUvq5Uz+NVtAk3hmrR7w3
i7O6d7qw2aGlYYgmGILOSEyHtdaU8uFG6ssPWV7OuMzkfYhXskoXenCO4ZNRS8I9
L261URWsOhSSJGTUoVg+fkxV3N8WXdcLvcuNRr5jqGqZdHHRxMkpSG3koMaJXeNe
SrK2eI4gCHiK6B+BAa6YYYLciYtUOth/nUxu4vGRXgw0u4nyWZB6ngKYGdrnPgo7
52Oej2r1rrTw8GEsD67/FA3j+49QFVBf8qZ1Zl5ASq14kFV6/5Jw6H/oTlTHkcww
mlhaySGQrWZssB7EjTCElr91fg8/Oov8zAMdb6zQwBPSx/gjhiNy6w8Hvy3XU04p
tHoeHUk7UsviDrXyHvOGYkmjVy3vavNBPHDZBNhpL2qiMc7GQ4kzWHaBoOxadEk5
OV8aIQxxOyjbWhwZrR5SCGItij5q4ccpEuHWmIMB4IPxLRpKeSehcyKFduc4DE4C
apuvn/WDRe5VEMaSzs/EdgQBxY6rC8aXKZh88jvRz9AuB7sFic0Q/L9d542r30XQ
MNpWseMksj1bDcMTI1rQLXGc7Kfgcn7gIVzB6LEmRerYG/puRtMkRvlZaeiIIJ5V
aY+89AmU0Cro7SE2As1wZXozNc7DYyT5vOP7l+BVNTk06VbSqmeU6lgC1BU900xx
RlGex3+WGkkSxQFOav5u5d6UCJwjk8GB3LTYRBbFBie6g44bKOSlqdvVHLux8VMk
jJFizju+Dz+UN1Xa73tS+w6mlWmANB+LlsjKZZOBlD4JjMaBnHVdQq4r5NzODo/U
0x6kVhtWNe20DV9QQtJ0lUwem2hKpkuUwK+3KeLj/TA0z7HVCy1g6LPY7HAPfbOg
-----END RSA PRIVATE KEY-----`,
};
