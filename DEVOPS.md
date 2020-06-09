# devops tasks
Once the `echo-service-with-mongo` is deployed we need get its service url details and create a secret for the client to use.

```
kubectl config current-context
kubectl get namespace

kubectl get services --all-name                         # List all services in the namespace
kubectl get pods --all-namespaces

> in context of ibm cloud kubes cluster
kubectl create secret generic echo-service-url --from-literal=echo_service_url=http://173.193.79.169:32743 --namespace  prod 
```


## Connecting K8s app to IBM Cloud db
```
ibmcloud login
# target where the cluster is
ibmcloud target -g swp-dev 

kubectl config current-context
kubectl config use-context swp-cluster/brab7k8d02k3fvrfrl00


# target where k8s cluster is e.g. resource group 'swp-dev'
ibmcloud target -g swp-dev 

# set cluster context
ibmcloud ks cluster config --cluster brab7k8d02k3fvrfrl00

# add private namespace for image registry
ibmcloud cr namespace-add swp-ns

# get namespaces in current cluster context
kubectl get namespace

# add the Cloud Databases deployment to your cluster
# syntax: ibmcloud ks cluster service bind --cluster CLUSTER --namespace NAMESPACE --service SERVICE
ibmcloud ks cluster service bind --cluster swp-cluster --namespace swp-ns --service db-mongo-swp
> Namespace:     swp-ns   
> Secret Name:   binding-db-mongo-swp   

# deploy ie via toolchain
kubectl apply -f deployment.yml

# create or update (delete and create) a secret
# usually when backend service redeploy and gets new IP address
kubectl delete secret echo-service-url -n swp-ns
kubectl create secret generic echo-service-url --from-literal=echo_service_url=http://173.193.79.114:32261/ --namespace  swp-ns 

```
0. cluster - target group - cluster ns - container registry ns
1. create db 
3. deploy echo-service - which creates namespace - get endpoint
3. create binding
4. create service url
5. deploy echo-next-client


# show secrets
kubectl get secrets --namespace=swp-ns
```

## Debugging / logs
```
kubectl get pods -n swp-ns
kubectl logs echo-service-with-mongo-74db8c95fb-9nn6k -n swp-ns

```
