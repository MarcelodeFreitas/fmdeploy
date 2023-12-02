# FMdeploy

FMdeploy is the main artifact developed for the dissertation of Marcelo Marreiros at the University of Minho School of Engineering, supervised by Victor Alves.

- **Developer:** Marcelo Marreiros
- **Email:** marcelodefreitas25@gmail.com
- **Supervisor:** Victor Alves
- **Dissertation Title:** FMdeploy - Simplifying Machine Learning Deployment for Academia via Web Interfaces

## Overview

FMdeploy brings together both the backend, FMdeploy-FastAPI, and the frontend, FMdeploy-ReactJS, providing a comprehensive platform for deploying machine learning models. It includes the necessary changes to easily containerize the code using Docker, specifically Docker Compose.

Additionally, FMdeploy incorporates Traefik to secure communication and manage certificates.

## Usage

To use this repository, follow the steps below:

1. **Fork and Modify Docker Compose Files:** Make necessary changes to the Docker Compose files to update the domain and ports according to your requirements.

2. **Clone and Setup:**
   - Clone this repository to your desired location.
   - Modify the Docker Compose files according to your specifications.

3. **Run Docker Compose:**
   - For development:
     ```
     docker-compose -f docker-compose-dns.yml up -d
     ```
   - For production with valid HTTPS certificates (requires updating DNS challenge variables):
     ```
     docker-compose -f docker-compose-dns.prod.yml up -d
     ```

This will initiate the setup process for FMdeploy, enabling the platform for deploying machine learning models.

## Note

Ensure that you have properly configured the DNS A records for the specified domain. Also, verify that the Docker Compose files are adjusted to match your domain and port settings. Additionally, for production use, ensure valid DNS challenge variables. 
If you decide to use a different provider check traefik documentation to complete the DNS challenge.

## Contact Information

For any queries or additional information, please contact Marcelo Marreiros at marcelodefreitas25@gmail.com.

Thank you for your interest in FMdeploy! 
