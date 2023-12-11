import React ,{useContext,useReducer,createContext} from "react";

const CourseContext = createContext(null);

const CourseDispatchContext = createContext(null);


export function CourseProvider({ children }) {

  const [courses, dispatch] = useReducer(
    courseReducer,
    initialCourse
  );
  return (
    <CourseContext.Provider value={courses}>
      <CourseDispatchContext.Provider value={dispatch}>
        {children}
      </CourseDispatchContext.Provider>
    </CourseContext.Provider>
  );
}


export function useCourse() {
    return useContext(CourseContext);
  }
  
export function useCourseDispatch() {
    console.log("course dispatch used")
    return useContext(CourseDispatchContext);
}


function courseReducer(course,action){
    console.log("in courseReducer",action.type)
    switch(action.type){
        case 'added' : {
            console.log("action added",action)
            return {
                ...course,
                content : action.content
            }
        }
        case 'updateMeta' : {
            console.log(action);
            console.log("cours",course);
            return {
                ...course,
                options : {
                 "name" : action.options.name,
                "lang_src" : action.options.lang_src,
                "lang_dest" : action.options.lang_dest,
                "theme" : action.options.theme,
                "level" : action.options.level,
                "type": action.options.type
              }
            };
        }
        case 'nextStep':{
            return {step : action.step} 
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}


const initialCourse = {
    "step" :0,
    "options":{},
    "content":[]
  }
/*
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }*/