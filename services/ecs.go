package services

import (
	"github.com/aws/aws-sdk-go/service/ecs"
	"github.com/donkeysharp/eazy-panel/aws"
)

func GetECSClustersByPattern(pattern string, includeTasks bool) ([]*aws.ECSCluster, error) {
	result := make([]*aws.ECSCluster, 0)

	ecsClient, err := aws.NewECSClient()
	if err != nil {
		return nil, err
	}

	clusterList, err := ecsClient.GetClusters(pattern)
	if err != nil {
		return nil, err
	}

	for _, clusterArn := range clusterList {
		cluster := &aws.ECSCluster{
			Arn: clusterArn,
		}
		if includeTasks {
			tasks, err := ecsClient.GetTasksByCluster(clusterArn)
			if err != nil {
				return nil, err
			}
			cluster.Tasks = tasks.Tasks
		}

		result = append(result, cluster)
	}

	return result, nil
}

func GetTaskDefinitionByArn(arn *string) (*ecs.TaskDefinition, error) {
	ecsClient, err := aws.NewECSClient()
	if err != nil {
		return nil, err
	}

	result, err := ecsClient.GetTaskDefinition(arn)

	return result, err
}
