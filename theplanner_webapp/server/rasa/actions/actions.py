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

            title=tracker.get_slot("title")
            time=tracker.get_slot("time")
            duration=tracker.get_slot("duration")
            start_time=tracker.get_slot("start_time")
            dispatcher.utter_message(template="utter_task_created_complete", title=title, date=time, start_time=start_time, duration=duration)
            return []
