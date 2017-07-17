package aws

import (
	"github.com/aws/aws-sdk-go/service/ecs"
	"strings"
)

const (
	MAX_RESULTS int64 = 100
)

type ECSCluster struct {
	Arn   *string
	Tasks []*ecs.Task
}

type ECSClient struct {
	Service *ecs.ECS
}

func NewECSClient() (*ECSClient, error) {
	ecsService, err := getECSService()
	if err != nil {
		return nil, err
	}

	return &ECSClient{Service: ecsService}, nil
}

func (e *ECSClient) GetClusters(pattern string) ([]*string, error) {
	filteredClusters := make([]*string, 0)
	clusters := make([]*string, 0)
	maxResults := MAX_RESULTS

	input := &ecs.ListClustersInput{MaxResults: &maxResults}

	result, err := e.Service.ListClusters(input)
	if err != nil {
		return nil, err
	}

	for result.NextToken != nil {
		clusters = append(clusters, result.ClusterArns...)

		input.NextToken = result.NextToken
		result, err = e.Service.ListClusters(input)
		if err != nil {
			return nil, err
		}
	}
	clusters = append(clusters, result.ClusterArns...)

	for _, arn := range clusters {
		if strings.Contains(*arn, pattern) {
			filteredClusters = append(filteredClusters, arn)
		}
	}

	return filteredClusters, nil
}

func (e *ECSClient) GetTasksByCluster(clusterArn *string) (*ecs.DescribeTasksOutput, error) {
	taskList, _ := e.Service.ListTasks(&ecs.ListTasksInput{
		Cluster: clusterArn,
	})
	tasks, _ := e.Service.DescribeTasks(&ecs.DescribeTasksInput{
		Cluster: clusterArn,
		Tasks:   taskList.TaskArns,
	})

	return tasks, nil
}

func (e *ECSClient) GetTaskDefinition(arn *string) (*ecs.TaskDefinition, error) {
	result, err := e.Service.DescribeTaskDefinition(&ecs.DescribeTaskDefinitionInput{
		TaskDefinition: arn,
	})

	return result.TaskDefinition, err
}
