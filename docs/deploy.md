# Deployments

A deployment takes a built artifact (ie golang app in a docker container) and deploys it to an environment (a k8s cluster).

## The k8s Environment

We're using GKE from Google Cloud in our example, but any k8s cluster will work.

There are currently a few things we're doing manually to prepare an environment:

- Cluster Creation (Done through Console - Autopilot)
- IAM Service Account using permissions described here [Deploy to k8s](https://docs.github.com/en/actions/deployment/deploying-to-your-cloud-provider/deploying-to-google-kubernetes-engine) - ie cluster admin, and storage admin (you may have to tweak permissions for your own deployment)
- `GKE_SA_KEY` in github populated using the json key created from the above service account - ie `cat key.json | base64`

The Cluster `gke-test-2022` lives in tihe project `contini-XXX-de5a` which is `Squad Zero > Andrew Khoury Contino`.

## The deployment

Our github workflow `deploy.yml` ("Deploy to k8s") does the deployment, and is based on [google-github-actions](https://github.com/google-github-actions/setup-gcloud/tree/main/example-workflows/gke).

What it does:

- Sets some key variables `PROJECT_ID`, `GKE_CLUSTER`, `GKE_ZONE`, `DEPLOYMENT_NAME`, `IMAGE`
- Runs as a production deployment, checks out code, auths to gcloud
- builds the app, publishes it
- deploys to k8s after ensuring we're using the newly built image (using a combo of kustomize and kubectl)

What it depends on:

- `kustomization.yml` (to tell it to look for `deployment.yml`)
- `deployment.yml` (k8s config - app/service name, container, ports, lb etc)

# Todos

- Use dev for this pipeline? And Prod for the prod pipeline?
- Automate env setup
- Make this step gsd like, ie `make deploy`
- Instead of building during this step, leverage the build from the main CI? (build once deploy many)
