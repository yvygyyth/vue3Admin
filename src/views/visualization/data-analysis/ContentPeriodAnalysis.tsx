import ChartComponent from '@/components/chart-component'
import useChartOption from '@/hooks/chartOption'
import { Card, Spin } from '@arco-design/web-vue'
import axios from 'axios'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const tooltipItemsHtmlString = (items: any[]) => {
      return items
        .map(
          (el) => `<div class="content-panel">
            <p>
              <span style="background-color: ${el.color}" class="tooltip-item-icon"></span>
              <span>${el.seriesName}</span>
            </p>
            <span class="tooltip-value">
            ${el.value}%
            </span>
          </div>`
        )
        .join('')
    }
    const xAxis = ref<string[]>([])
    const textChartsData = ref<number[]>([])
    const imgChartsData = ref<number[]>([])
    const videoChartsData = ref<number[]>([])
    const { chartOption } = useChartOption((isDark) => {
      return {
        grid: {
          left: '40',
          right: 0,
          top: '20',
          bottom: '100'
        },
        legend: {
          bottom: 0,
          icon: 'circle',
          textStyle: {
            color: '#4E5969'
          }
        },
        xAxis: {
          type: 'category',
          data: xAxis.value,
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: isDark ? '#3f3f3f' : '#A9AEB8'
            }
          },
          axisTick: {
            show: true,
            alignWithLabel: true,
            lineStyle: {
              color: '#86909C'
            },
            interval(idx: number) {
              if (idx === 0) return false
              if (idx === xAxis.value.length - 1) return false
              return true
            }
          },
          axisLabel: {
            color: '#86909C',
            formatter(value: number, idx: number) {
              if (idx === 0) return ''
              if (idx === xAxis.value.length - 1) return ''
              return `${value}`
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#86909C',
            formatter: '{value}%'
          },
          splitLine: {
            lineStyle: {
              color: isDark ? '#3F3F3F' : '#E5E6EB'
            }
          }
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          formatter(params: any) {
            const [firstElement] = params
            return `<div>
                <p class="tooltip-title">${firstElement.axisValueLabel}</p>
                ${tooltipItemsHtmlString(params)}
              </div>`
          },
          className: 'echarts-tooltip-diy'
        },
        series: [
          {
            name: '纯文本',
            data: textChartsData.value,
            type: 'line',
            smooth: true,
            showSymbol: false,
            color: isDark ? '#3D72F6' : '#246EFF',
            symbol: 'circle',
            symbolSize: 10,
            emphasis: {
              focus: 'series',
              itemStyle: {
                borderWidth: 2,
                borderColor: '#E0E3FF'
              }
            }
          },
          {
            name: '图文类',
            data: imgChartsData.value,
            type: 'line',
            smooth: true,
            showSymbol: false,
            color: isDark ? '#A079DC' : '#00B2FF',
            symbol: 'circle',
            symbolSize: 10,
            emphasis: {
              focus: 'series',
              itemStyle: {
                borderWidth: 2,
                borderColor: '#E2F2FF'
              }
            }
          },
          {
            name: '视频类',
            data: videoChartsData.value,
            type: 'line',
            smooth: true,
            showSymbol: false,
            color: isDark ? '#6CAAF5' : '#81E2FF',
            symbol: 'circle',
            symbolSize: 10,
            emphasis: {
              focus: 'series',
              itemStyle: {
                borderWidth: 2,
                borderColor: '#D9F6FF'
              }
            }
          }
        ],
        dataZoom: [
          {
            bottom: 40,
            type: 'slider',
            left: 40,
            right: 14,
            height: 14,
            borderColor: 'transparent',
            handleIcon:
              'image://http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/1ee5a8c6142b2bcf47d2a9f084096447.svg~tplv-49unhts6dw-image.image',
            handleSize: '20',
            handleStyle: {
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 4
            },
            brushSelect: false,
            backgroundColor: isDark ? '#313132' : '#F2F3F5'
          },
          {
            type: 'inside',
            start: 0,
            end: 100,
            zoomOnMouseWheel: false
          }
        ]
      }
    })
    const fetchData = async () => {
      //   setLoading(true)
      try {
        const { data: chartData } = (await axios.post<any>('/api/content-period-analysis')).data
        xAxis.value = chartData.xAxis
        chartData.data.forEach((el: any) => {
          if (el.name === '纯文本') {
            textChartsData.value = el.value
          } else if (el.name === '图文类') {
            imgChartsData.value = el.value
          }
          videoChartsData.value = el.value
        })
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        // setLoading(false)
      }
    }
    fetchData()

    return () => (
      <Spin>
        <Card>
          <ChartComponent options={chartOption.value}></ChartComponent>
        </Card>
      </Spin>
    )
  }
})