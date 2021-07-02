# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.events import EventType
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import AllSlotsReset

class saveTask(Action):

    def name(self) -> Text:
        return "action_save_task"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

            title=tracker.get_slot("title")
            time=tracker.get_slot("time")
            date=time[0:10]
            duration=tracker.get_slot("duration")
            start_time=tracker.get_slot("start_time")
            save_task = { 
                "text": f"Task {title} is saved on {date} 😁",
                "save_task" : {
                    "title":title, 
                    "date":date,
                    "start_time":start_time, 
                    "duration":duration
                }
            }
            dispatcher.utter_message(json_message = save_task)
            return []

class searchTasksByDate(Action):

    def name(self) -> Text:
        return "action_search_tasks_by_date"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
            time=tracker.get_slot("time")
            date=time[0:10]
            search_tasks_by_date = { 
                "text": f"The tasks on this date: {date} are shown on your calendar",
                "search_tasks_by_date" : { 
                    "date":date
                }
            }
            dispatcher.utter_message(json_message=search_tasks_by_date)
            return []

class searchTasksByTitle(Action):

    def name(self) -> Text:
        return "action_search_tasks_by_title"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
            title=tracker.get_slot("title")
            search_tasks_by_title = { 
                "text": f"The tasks with this title: {title} are shown on your calendar",
                "search_tasks_by_title" : { 
                    "title":title
                }
            }
            dispatcher.utter_message(json_message=search_tasks_by_title)
            return []  

class searchTasksByTitleAndDate(Action):

    def name(self) -> Text:
        return "action_search_tasks_by_title_and_date"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
            title=tracker.get_slot("title")
            time=tracker.get_slot("time")
            date=time[0:10]
            search_tasks_by_title_and_date = { 
                "text": f"The tasks with this title: {title} on this date: {date} are shown on your calendar",
                "search_tasks_by_title_and_date" : { 
                    "title":title,
                    "date":date
                }
            }
            dispatcher.utter_message(json_message=search_tasks_by_title_and_date)
            return []                                                  

class ResetSlots(Action):
    def name(self) -> Text:
        return "action_reset_all_slots"

    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict
    ) -> List[EventType]:
        return[AllSlotsReset()]



