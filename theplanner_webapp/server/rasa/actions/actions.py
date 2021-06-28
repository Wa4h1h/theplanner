# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher


class save_task_form(Action):

    def name(self) -> Text:
        return "save_task_form"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

       # title_task=tracker.get_slot("title")
       # date_time=tracker.get_slot("time")
        #date_extracted=date_time[0:10]
        #time_from=date_time[11:13]
        #obj={'title':title_task,
        #'start_time':time_from,
        #'end_time':time_from,
        #'date':date_extracted}

        #dispatcher.utter_message(json_message = obj)
        #return []
