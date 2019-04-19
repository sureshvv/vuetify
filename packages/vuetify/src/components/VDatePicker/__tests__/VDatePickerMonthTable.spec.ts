import VDatePickerMonthTable from '../VDatePickerMonthTable'
import { Lang } from '../../../services/lang'
import {
  mount,
  MountOptions,
  Wrapper
} from '@vue/test-utils'

describe('VDatePickerMonthTable.ts', () => {
  type Instance = InstanceType<typeof VDatePickerMonthTable>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VDatePickerMonthTable, {
        ...options,
        mocks: {
          $vuetify: {
            lang: new Lang()
          }
        }
      })
    }
  })

  it('should render component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005',
        current: '2005-05',
        value: '2005-11'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component and match snapshot (multiple)', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005',
        current: '2005-05',
        value: ['2005-11', '2005-10']
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it.skip('should watch tableDate value and run transition', async () => { // TODO: make this one work
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005',
        current: '2005-05',
        value: '2005-11'
      }
    })

    wrapper.setProps({
      tableDate: '2006'
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('table').wrappers[0].element.className).toBe('tab-transition-enter tab-transition-enter-active')
  })

  it.skip('should watch tableDate value and run reverse transition', async () => { // TODO: make this one work
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005',
        current: '2005-05',
        value: '2005-11'
      }
    })

    wrapper.setProps({
      tableDate: '2004'
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('table').wrappers[0].element.className).toBe('tab-reverse-transition-enter tab-reverse-transition-enter-active')
  })

  it('should emit event when month button is clicked', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005',
        current: '2005-05',
        value: '2005-11'
      }
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.findAll('tbody button').wrappers[0].trigger('click')
    expect(input).toHaveBeenCalledWith('2005-01')
  })

  it('should not emit event when disabled month button is clicked', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005',
        current: '2005-05',
        value: '2005-11',
        allowedDates: () => false
      }
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.findAll('tbody button').wrappers[0].trigger('click')
    expect(input).not.toHaveBeenCalled()
  })

  it('should emit tableDate event when scrolled and scrollable', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005',
        scrollable: true
      }
    })

    const tableDate = jest.fn()
    wrapper.vm.$on('tableDate', tableDate)

    wrapper.trigger('wheel')
    expect(tableDate).toHaveBeenCalledWith('2006')
  })

  it('should not emit tableDate event when scrolled and not scrollable', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005'
      }
    })

    const tableDate = jest.fn()
    wrapper.vm.$on('tableDate', tableDate)

    wrapper.trigger('wheel')
    expect(tableDate).not.toHaveBeenCalled()
  })

  // TODO
  it.skip('should emit tableDate event when swiped', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005'
      }
    })

    const tableDate = jest.fn()
    wrapper.vm.$on('tableDate', tableDate)

    wrapper.trigger('touchstart')
    wrapper.trigger('touchend')
    expect(tableDate).toHaveBeenCalledWith(2006)
  })

  it('should change tableDate when touch is called', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005'
      }
    })

    const tableDate = jest.fn()
    wrapper.vm.$on('tableDate', tableDate)

    wrapper.vm.touch(1, wrapper.vm.calculateTableDate)
    expect(tableDate).toHaveBeenCalledWith('2006')
    wrapper.vm.touch(-1, wrapper.vm.calculateTableDate)
    expect(tableDate).toHaveBeenCalledWith('2004')
  })

  it('should render component with events (array) and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005',
        events: ['2005-07', '2005-11'],
        eventColor: 'red'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with events (function) and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005',
        events: date => date === '2005-07' || date === '2005-11',
        eventColor: 'red'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with events colored by object and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005',
        events: ['2005-07', '2005-11'],
        eventColor: { '2005-07': 'red', '2005-11': 'blue lighten-1' }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with events colored by function and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005',
        events: ['2005-07', '2005-11'],
        eventColor: date => ({ '2005-07': 'red', '2005-11': 'blue lighten-1' }[date])
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
