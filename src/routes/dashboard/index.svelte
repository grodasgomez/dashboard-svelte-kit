<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';
	var ctx = 'myChart';
	let myChart: Chart;
  let data = [12, 19, 3, 5, 2, 3];
	onMount(() => {
		myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
				datasets: [
					{
						label: '# of Votes',
						data,
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)'
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)'
						],
						borderWidth: 1
					}
				]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
	});

  function handleAdd(){
    data = data.map((number)=> number + 10);
    myChart.data.datasets[0].data = data;
    myChart.update();
    console.log(myChart.data.datasets[0].data);
  }
</script>

<h1 class="title">En progreso</h1>
<button type="button" class="button" on:click={handleAdd}>Add 10 to all</button>

<canvas id="myChart" />
