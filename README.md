Angular EE
=============

A reference implementation for how to build an Angular JS application backed by a JavaEE RESTful API.

Features
---

This app showcases the following features ([related blog post](http://nayidisha.com/techblog/angular-js-from-a-different-angle "AngularEE")):

- How to build layers in an Angular JS MVC stack.
- How to write tests for each layer of the Angular stack
- How to run Angular and Server-side tests during the build
- How to make the Angular stack aware of the environment it is running in.

Demo
---

View a demo [here](http://pointy-nayidisha.rhcloud.com/pointy)

Related Blog Post
----

See [here for a blog post](http://nayidisha.com/techblog/angular-js-from-a-different-angle "AngularEE") explaining this effort.

Checkout
---

Clone or fork [the repository](https://github.com/pankajtandon/PointyPatient "PointyPatient") in your workspace under a directory we will call $POINTY_HOME

Build
----

The build of the Angular __plus__ the Java stack is done using [maven](http://maven.apache.org/). 
This will run unit tests and build the two war's (pointy-web and pointy-api).
Once you have downloaded and installed maven, please do the following:


`cd $POINTY_HOME`

`mvn clean install -f pointy-parent/pom.xml `

followed by:

`mvn clean install -f pointy-build/pom.xml `


Run all tests
---

The below commands run unit tests _and_ integration tests. This translates to *Jasmine Unit* tests and *E2E Selenium Integration tests* on 
the Angular stack and *Spring MVC tests*, *Spring Transactional Tests* and JUnit tests using *Mockito* on the Java stack.

`cd $POINTY_HOME`

`mvn clean install -Pdev,alltests -f pointy-build/pom.xml`

Run the app
---

The app can be seen in action by deploying the apps (pointy-web.war and pointy-api.war) to a jetty server running on port 9020 of localhost.
The jetty server can be started by doing the following:

`cd $POINTY_HOME`

`mvn clean install -f pointy-build/pom.xml -Palltests,dev`

`mvn jetty:run -Palltests,dev -f pointy-web/pom.xml`


Next, fire up a browser and navigate to localhost:9020/pointy

Register, Edit, Delete or List patients.

By doing this you are interacting with an Angular app (pointy-web) in the browser and using REST calls going out to pointy-api, 
also, incidentally, hosted on the same server. Note, tho' that if you host pointy-api on a different server, then either a CORS solution
will need to be implemented (via a CORS filter maybe), or we have to change the app to accept application/javascript 
instead of application/json (JSONP).

TODOs
---

The following still need to be accomplished. Pull Requests are welcome:

- Complete E2E tests using jQuery
- Fix the date directive. For some reason, the date directive that I wrote using jQuery, doesn't seem to work. But since it is not central to the idea of this project, I'm not losing sleep over this.
- Write a Spring Service level unit test
- Write a Spring Service level Integration Test
- Write a Spring Repository level unit test


