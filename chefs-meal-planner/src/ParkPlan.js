/**
 * Renders the ParkPlan component page.
 * @component
 * @module ParkPlan
 * @returns {JSX.Element} The rendered ParkPlan component.
 */
import React from 'react'
import ParkPlanParent from './ParkPlan/Components/Parent'
import Banner from './ParkPlan/Components/Banner'
const ParkPlan = () => {
  return (
    <div className="park-plan">
      
      <Banner/>
      <ParkPlanParent />
    </div>
  )
}

export default ParkPlan