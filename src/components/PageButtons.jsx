import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'



export default function PageButtons({ data, indexFromSurvey, setIndexFromSurvey, indexToSurvey, setIndexToSurvey }) {



    function previousPage() {
        if(indexFromSurvey > 0) {
            setIndexFromSurvey(indexFromSurvey - 12);
            setIndexToSurvey(indexToSurvey - 12);
        }
    }

    function nextPage() {   
        if(indexFromSurvey + 12 < data.length) {
            setIndexFromSurvey(indexFromSurvey + 12);
            setIndexToSurvey(indexToSurvey + 12);
        }
    }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
            onClick={() => previousPage()}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </a>
        <a
            onClick={() => nextPage()}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Prikaz <span className="font-medium">{data.length == 0 ? indexFromSurvey : indexFromSurvey + 1}</span> do <span className="font-medium">{data.length < indexToSurvey ? data.length : indexToSurvey}</span> od{' '}
            <span className="font-medium">{data.length}</span> rezultatov
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
                onClick={() => previousPage()}
                href='#'
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>  
            <a
                onClick={() => nextPage()}
                href='#'
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}