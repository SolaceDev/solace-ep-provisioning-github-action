# Solace PubSub+ Event Portal Provisioning 

This github action facilitates the provisioning of the designed event driven architecture to the target event broker.

The provisioning logic is defined in https://github.com/TamimiGitHub/solace-terraform-provisioning

# Inputs

- `Broker_Type`:  Solace | Confluent 
- `AWS_ACCESS_KEY_ID`: AWS Access Key ID to read/write terraform state files on S3 bucket
- `AWS_SECRET_ACCESS_KEY`: AWS Secret Access Key to read/write terraform state files on S3 bucket
- `APPLICATION_VERSION_ID`: Application Version ID to promote
- `PLAN_ONLY`: Run terraform plan only

<details>
<summary> <b> Required environment variables for Solace provisioning </b></summary>

  | Env variable name  | Required/Optional | Description | Default |
  | ------------- | ------------- | ------------- | ------------- |
  | `SOLACE_CLOUD_TOKEN`  | Required  | Solace Cloud token | NA |
  | `TF_VAR_solace_url`  | Required  | Solace Broker URL | NA |
  | `TF_VAR_semp_username`  | Required  | Solace Broker SEMP username | NA |
  | `TF_VAR_semp_password`  | Required  | Solace Broker SEMP password | NA |
  | `SOL_MSG_VPN`  | Required  | Solace Broker message VPN | terraform |
  | `SOLACE_MESSAGING_SERVICE`  | Optional  | The target messaging service to provision | The first messaging service in EP |

</details>

<details>
<summary> <b> Required environment variables for Confluent provisioning </b></summary>

| Env variable name  | Required/Optional | Description | Default |
| ------------- | ------------- | ------------- | ------------- | 
| `SOLACE_CLOUD_TOKEN`  | Required  | Solace Cloud token | NA |
| `TF_VAR_confluent_cloud_api_key`  | Required  | Confluent cloud API Key with global access type| NA |
| `TF_VAR_confluent_cloud_api_secret`  | Required  | Confluent cloud API Secret with global access type| NA |
| `AWS_ACCESS_KEY_ID`  | Required  | AWS Key ID | NA |
| `AWS_SECRET_ACCESS_KEY`  | Required  | AWS Access Key | NA |
| `SOLACE_MESSAGING_SERVICE`  | Optional  | The target messaging service to provision | The first messaging service in EP |

</details>

## Example usage

```yaml
uses: SolaceDev/solace-ep-provisioning-github-action@v1.9.1
with:
  BROKER_TYPE: confluent
  SOLACE_MESSAGING_SERVICE: ${{ secrets.SOLACE_MESSAGING_SERVICE }}
  SOLACE_CLOUD_TOKEN: ${{ secrets.SOLACE_CLOUD_TOKEN }}
  TF_VAR_confluent_cloud_api_key: ${{ secrets.TF_VAR_confluent_cloud_api_key }}
  TF_VAR_confluent_cloud_api_secret: ${{ secrets.TF_VAR_confluent_cloud_api_secret }}
  AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
  AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

```yaml
uses: SolaceDev/solace-ep-provisioning-github-action@v1.9.1
with:
  BROKER_TYPE: solace
  SOLACE_MESSAGING_SERVICE: ${{ secrets.SOLACE_MESSAGING_SERVICE }}
  SOLACE_CLOUD_TOKEN: ${{ secrets.SOLACE_CLOUD_TOKEN }}
  TF_VAR_solace_url: ${{ secrets.TF_VAR_solace_url }}
  TF_VAR_semp_username: ${{ secrets.TF_VAR_semp_username }}
  TF_VAR_semp_password: ${{ secrets.TF_VAR_semp_password }}
  SOL_MSG_VPN: ${{ secrets.SOL_MSG_VPN }}
  AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
  AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```
