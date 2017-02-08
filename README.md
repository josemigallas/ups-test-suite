# Unified Push Server Test Suite
Test suite designed to stress test or _massage_ the UPS and verify that everything works smooth.

![current_ups_state](https://camo.githubusercontent.com/67788c5031750b707cf2ef584f7f466eb403161b/68747470733a2f2f63646e302e766f782d63646e2e636f6d2f7468756d626f722f5f4a49364d676547516665374278563166704c30434270443277303d2f3678303a383935783530302f31363030783930302f63646e302e766f782d63646e2e636f6d2f75706c6f6164732f63686f7275735f696d6167652f696d6167652f34393439333939332f746869732d69732d66696e652e302e6a7067)

## Automation Tools

### WireMock
In order to stress-testing we must not talk directly to FCM, but to a mocked server that is provided by [WireMock](http://wiremock.org/) tool.

### Mock APNs
In case of iOS devices we need to use a mock of the APNs, in this case provided by [Mock APNS Server](https://github.com/aerogear/mockapns).

### Mocked Data Loader
A tool to produce mock data (push applications, variants and tokens) can be found into the [mock-data-loader](mock-data-loader) folder.

### UPS Node.js Test Suite
A Node.js tool that gets all PushApplications from the UPS and sends a Push notification to it. It's leveraging other AeroGear/JBoss tools. The source is in the [ups-test-suite](ups-test-suite) folder.

### Artillery
[Artillery](https://artillery.io/) is a command-line load testing tool that will send requests directly to UPS's REST API. 

## Usage
First step is to install and start up both mocked servers.
#### FCM server
Firstly `cd` to the path where you want to install it and simply run the next script, it will create the server inside a folder and start it:
```
bash <(curl https://gist.githubusercontent.com/josemigallas/9577750d09f87aaaa570c64d5ce8b58e/raw/83124a8596c93a862bcaefbb2dad4522c5d60828/Start%2520Up%2520WireMock)
```

To start it again only use:
```
java -jar path/to/server/wiremock-standalone-2.4.1.jar --port 3000
```
#### APNs server
After this, install and run the APNs server following [this instructions](https://github.com/aerogear/mockapns).

Now, before starting UPS you will need to add the APNs Mock Server certificate to your JVM trusted certificates list. In order to do that convert it to DER format
```
openssl x509 -in path/to/certificate -out cert.crt -outform DER
```

Then go to your JVM home directory and import the ssl certificate into the trusted certificates list:
```
cd $JAVA_HOME/jre/lib/security
sudo keytool -importcert -keystore cacerts -storepass changeit -file /path/to/cert.crt -trustcacerts
```
You will be prompted to confirm it is a trusted certificate, enter `yes`.
> MacOS: run `$ /usr/libexec/java_home` to locate your $JAVA_HOME dir.

#### UPS
Once the ssl certificate has been added, start your UPS setting `-Dcustom.aerogear.fcm.push.host` and `-Dcustom.aerogear.apns.push.host` with the proper values:
```
path/to/jboss/bin/standalone.sh -b 0.0.0.0 --server-config=standalone-full.xml -Dcustom.aerogear.fcm.push.host=http://localhost:3000/fcm/send -Dcustom.aerogear.apns.push.host=127.0.0.1
```
> Note: in case you need to install a local UPS follow the [installation guide](https://aerogear.org/docs/unifiedpush/ups_userguide/index/#server-installation).

And that's it, any notification request will be sent to the mocked backend.

#### Run test suite
Next step is run the actual load tests. Firstly install Artillery:
```
npm install -g artillery
```

Then download the ups-artillery.yml file and simply run it:
```
artillery run ups-artillery.yml
```
> Note: modify the YAML file the way it suits your spec. Authorization header must be filled with "appId:secret" b64 encoded. More info in the [artillery documentation](https://artillery.io/docs/script_reference.html).
