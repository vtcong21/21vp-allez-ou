// Hàm để cập nhật dữ liệu biểu đồ
function updateChartWithData(data) {
  var ctx = document.getElementById('myChart').getContext('2d');
  
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: [
            changeDateToString(data[0].date),
            changeDateToString(data[1].date),
            changeDateToString(data[2].date),
            changeDateToString(data[3].date),
            changeDateToString(data[4].date),
            changeDateToString(data[5].date),
            changeDateToString(data[6].date),
          ],
          datasets: [{
              data: [
                data[0].revenue,
                data[1].revenue,
                data[2].revenue,
                data[3].revenue,
                data[4].revenue,
                data[5].revenue,
                data[6].revenue,
              ],
              lineTension: 0,
              backgroundColor: 'transparent',
              borderColor: '#007bff',
              borderWidth: 4,
              pointBackgroundColor: '#007bff'
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: false,
                  }
              }]
          },
          legend: {
              display: false
          }
      }
  });
}

// Hàm gọi API và cập nhật biểu đồ

function changeDateToString(currentTimeString) {
  var currentTime = new Date(currentTimeString); // Chuyển chuỗi thành đối tượng Date
  var day = currentTime.getDate();
  var month = currentTime.getMonth() + 1;
  var year = currentTime.getFullYear();

  if (day.toString().length === 1) {
      day = "0" + day.toString();
  }
  if (month.toString().length === 1) {
      month = "0" + month.toString();
  }

  return day + "/" + month + "/" + year;
}

async function postToGetDashboard() {
  try {
      const response = await axios.get('/dashboard/getRevenueLast7Days');
      let dashboards = response.data.last7DaysRevenue;
      console.log("done");
      // Gọi hàm cập nhật biểu đồ với dữ liệu từ API
      updateChartWithData(dashboards);
  } catch (error) {
      console.error(error);
  }
}

// Gọi hàm để lấy dữ liệu từ API và cập nhật biểu đồ
postToGetDashboard();

// Hiển thị doanh thu tháng này

const revenueThisMonth = document.getElementById('revenue-this-month');
const revenueProfit = document.getElementById('revenue-profit')

async function getRevnueProfit() {
    try {
      const response = await axios.get('/dashboard/getRevenueAndProfitPercentageThisMonth');
  
      if (response.status === 200) {
        displayProfit(response.data);
      } else {
        throw new Error('Lỗi khi gửi yêu cầu đến API');
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi:', error.message);
    }
  }

  function displayProfit(thisMonth){
    revenueThisMonth.textContent = thisMonth.currentMonthRevenue.toLocaleString() + " VNĐ";
    const profit = thisMonth.profitPercentage;
    if(profit < 0)
    {
        revenueProfit.textContent = "giảm " + -parseFloat(profit.toFixed(2)) + " %";
        revenueProfit.classList.add('decrease');
    }
    else if(profit > 0){
        revenueProfit.textContent = "tăng " + parseFloat(profit.toFixed(2)) + " %";
        revenueProfit.classList.add('increase');
    }
    else{
        revenueProfit.textContent = "bằng ";
    }
  }
  getRevnueProfit();