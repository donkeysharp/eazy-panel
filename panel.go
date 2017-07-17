package main

import (
	"encoding/json"
	"fmt"
	"github.com/donkeysharp/eazy-panel/services"
	"net/http"
)

func foobar() {
	clusters, err := services.GetECSClustersByPattern("reconmvs", false)
	if err != nil {
		fmt.Println("Error getting clusters")
		return
	}

	for _, cluster := range clusters {
		if len(cluster.Tasks) == 11 {
			fmt.Println(cluster.Arn)
			fmt.Println(services.GetTaskDefinitionByArn(cluster.Tasks[0].TaskDefinitionArn))
		}
	}
}

func clusterHandler(w http.ResponseWriter, r *http.Request) {
	clusters, _ := services.GetECSClustersByPattern("reconmvs", true)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(clusters)
}

func main() {
	http.HandleFunc("/api/clusters", clusterHandler)
	http.ListenAndServe(":8000", nil)
}
