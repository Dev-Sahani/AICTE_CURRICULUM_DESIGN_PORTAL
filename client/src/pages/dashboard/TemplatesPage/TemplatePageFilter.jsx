import FilterSearch from '../../../components/FilterSearch'
import FilterDropdown from '../../../components/FilterDropdown'

export default function TemplatePageFilter() {

  return (
    <nav className="w-full flex justify-evenly my-2">
        <FilterSearch 
            name="templateSearch"
            placeholder={"Enter Course Name"}
        />
        <FilterDropdown
          name="courseLevel"
          defaultValue="Select"
          list={["Diploma", "Undergraduate (UG)", "Postgraduate (PG)"]}
        />
        <FilterDropdown
          name="program"
          defaultValue="Select"
          list={[
            "Applied Arts and Crafts", 
            "Architecture and Town Planning", 
            "Architecture", 
            "Town Planning", 
            "Engineering & Technology", 
            "Hotel Management and Catering", 
            "Management", 
            "MCA", 
            "Pharmacy"
          ]}
        />
    </nav>
  )
}
