import { useEffect, useRef, useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import styles from '../styles/modules/search.module.scss';
import format from 'date-fns/format'
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const DateRangePickerComp = ({onChange, value}) => {



  // date state
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ])

  // open close
  const [open, setOpen] = useState(false)

  // get the target element to toggle
  const refOne = useRef(null)

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    if( e.key === "Escape" ) {
      setOpen(false)
    }
  }

  // Hide dropdown on outside click
  const hideOnClickOutside = (e) => {
    if( refOne.current && !refOne.current.contains(e.target) ) {
      setOpen(false)
    }
  }

  // console.log("range: ", range[0].startDate, range[0].endDate)
  // setStartDate(range[0].startDate)
  // setEndDate(range[0].endDate)


  return (
    <div className={styles.searchField} data-testid="dateRangePicker">

      <input
        value={`${format(value.startDate||new Date(), "MM/dd/yyyy")} to ${format(value.endDate||new Date(), "MM/dd/yyyy")}`}
        readOnly
        className={styles.inputBox}
        onClick={ () => setOpen(open => !open) }
      />

      <div ref={refOne}>
        {open &&
          <DateRangePicker
            onChange={item => {
              if (item.selection.startDate !== value.startDate || item.selection.endDate !== value.endDate){
                onChange(item.selection);
              }
            }}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={[{...value, key:"selection"}]}
            months={2}
            direction="horizontal"
            className={styles.calendarElement}
          />
        }
      </div>

    </div>
  )
}

export default DateRangePickerComp;
