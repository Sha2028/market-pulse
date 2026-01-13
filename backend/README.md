# sp-incb-market-pulse

This project is hosted on gitlab at https://gitlab.ihsmarkit.com/gitlabPath/sp-incb-market-pulse



## Development
The application is a Python 3.8 WSGI project. Dependencies are managed via PIP. The source code resides in src/main and the units tests in src/test. Additional requirements can be added in the requirements.txt file in the root of the project which are installed when the lambda package is created. 
This application uses https://www.serverless.com/plugins/serverless-wsgi to deploy the Flask code.
The lambda_handler.py has the wsgi boiler plate code and should not be changed.
So setup Routes , start with "handler.py" in src/main
All infrastructure configuration is managed via Terraform 13. Infrastructure as code is present in the infra directory of the project.



## Infrastructure
By default this project comes with a lambda integrated with a ALB or API Gateway. The project also comes with an optional s3 bucket which is not created by default but can be turned on by "BUCKET_REQUIRED" parameter in the gitlab-ci.yml file.

## Lambda
The lambda package is created in the package-ci job in the build stage. The lambda defaults are as below:-
    * Lambda Runtime :- Python 3.8
    * Memory:- 1024Mb
    * Timeout:- 900s
    * Lambda Handler :- "lambda_handler.handler"

The defaults can be changed in the variables.tf file in the infra directory

## Environments
The primary environment for testing is the CI env which is deployed automatically from the master branch of the project. Apart from CI, there is an additional QA env which is a controlled test environment. 

### QA and prod deployments
QA and Prod deployments are tag based . For eg - "QA/PROD-<RELEASE_VERSION>"
How will a release version look ?

    MAJOR.MINOR.PATCH, increment the:

        MAJOR version when you make incompatible API changes,
	    MINOR version when you add functionality in a backwards compatible manner, and
	    PATCH version when you make backwards compatible bug fixes

For more information on deployments, check the gitlab CI.
