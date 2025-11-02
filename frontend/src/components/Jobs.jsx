// import React, { useEffect, useState } from 'react'
// import Navbar from './shared/Navbar'
// import FilterCard from './FilterCard'
// import Job from './Job'
// import { useSelector } from 'react-redux'
// import { motion } from 'framer-motion'

// const Jobs = () => {
//   const { allJobs, searchedQuery } = useSelector((store) => store.job);
//   const [filterJobs, setFilterJobs] = useState(allJobs);

//   useEffect(() => {
//     if (!searchedQuery || Object.values(searchedQuery).every((v) => v === '')) {
//       setFilterJobs(allJobs);
//       return;
//     }

//     const filtered = allJobs.filter((job) => {
//       const matchLocation =
//         !searchedQuery.Location ||
//         job.location?.toLowerCase().includes(searchedQuery.Location.toLowerCase());

//       const matchIndustry =
//         !searchedQuery.Industry ||
//         job.title?.toLowerCase().includes(searchedQuery.Industry.toLowerCase());

//       const matchSalary =
//         !searchedQuery["Salary (in LPA)"] ||
//         checkSalaryRange(job.salary, searchedQuery["Salary (in LPA)"]);

//       return matchLocation && matchIndustry && matchSalary;
//     });

//     setFilterJobs(filtered);
//   }, [allJobs, searchedQuery]);

//   // ✅ Helper: check salary range (in LPA)
//   const checkSalaryRange = (salary, range) => {
//     if (!salary) return false;

//     // Convert to number if salary is string like "12 LPA" or "8.5"
//     const salaryValue = parseFloat(salary.toString().replace(/[^\d.]/g, ''));

//     switch (range) {
//       case '0-10':
//         return salaryValue >= 0 && salaryValue <= 10;
//       case '10-20':
//         return salaryValue > 10 && salaryValue <= 20;
//       case '20+':
//         return salaryValue > 20;
//       default:
//         return true;
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-7xl mx-auto mt-5 px-4">
//         <div className="flex flex-col lg:flex-row gap-5">
//           {/* Sidebar Filter */}
//           <div className="w-full lg:w-1/5">
//             <FilterCard />
//           </div>

//           {/* Job Listings */}
//           {filterJobs.length <= 0 ? (
//             <span className="text-gray-500 mt-10">No jobs found.</span>
//           ) : (
//             <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {filterJobs.map((job) => (
//                   <motion.div
//                     key={job?._id}
//                     initial={{ opacity: 0, x: 100 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -100 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <Job job={job} />
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Jobs;
import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    // Don't run until jobs are actually loaded
    if (!allJobs || allJobs.length === 0) return;

    // If no search/filter applied → show all jobs
    if (
      !searchedQuery ||
      Object.values(searchedQuery).every((v) => !v || v.trim() === '')
    ) {
      setFilterJobs(allJobs);
    } else {
      // Apply filters only if something is selected
      const filtered = allJobs.filter((job) => {
        const matchLocation =
          !searchedQuery.Location ||
          job.location?.toLowerCase().includes(searchedQuery.Location.toLowerCase());

        const matchIndustry =
          !searchedQuery.Industry ||
          job.title?.toLowerCase().includes(searchedQuery.Industry.toLowerCase());

        const matchSalary =!searchedQuery.Salary || checkSalaryRange(job.salary, searchedQuery.Salary);

         
        return matchLocation && matchIndustry && matchSalary;
      });

      setFilterJobs(filtered);
    }
  }, [allJobs, searchedQuery]); // 👈 re-run whenever jobs are fetched or filters change

  // ✅ Salary Range Helper
  const checkSalaryRange = (salary, range) => {
    if (!salary) return false;
    const salaryValue = parseFloat(salary.toString().replace(/[^\d.]/g, ''));
    switch (range) {
      case '0-10':
        return salaryValue >= 0 && salaryValue <= 10;
      case '10-20':
        return salaryValue > 10 && salaryValue <= 20;
      case '20+':
        return salaryValue > 20;
      default:
        return true;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Sidebar Filter */}
          <div className="w-full lg:w-1/5">
            <FilterCard />
          </div>

          {/* Job Listings */}
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            {(!filterJobs || filterJobs.length === 0) ? (
              <span className="text-gray-500 mt-10 block">No jobs found.</span>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    key={job?._id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
