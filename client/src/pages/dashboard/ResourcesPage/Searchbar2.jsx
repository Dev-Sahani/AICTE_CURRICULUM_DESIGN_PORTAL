import FilterSearch from '../../../components/FilterSearch'
import FilterDropdown from '../../../components/FilterDropdown'

export default function TemplatePageFilter() {

  return (
    <nav className="w-full flex justify-evenly my-2">
        <FilterSearch 
            name="resourceSearch"
            placeholder={"Search Resources"}
        />
        <FilterDropdown
          name="resourceFormat"
          defaultValue="Select Format "
          list={["books","videos","e-book"]}
        />
        {/* <FilterDropdown
          name="resourse"
          defaultValue="Select Subject"
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
        /> */}
    </nav>
  )
}
