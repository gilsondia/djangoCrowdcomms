# crowdcomms/webapp/urls.py

from django.conf.urls import url
from webapp import views

urlpatterns = [
    url(r'^$', views.IndexPageView.as_view(), name='index'),
    url(r'^todolist/$', views.TodoListPageView.as_view(), name='todolist'),
    url(r'^doubletap/$', views.Doubletap.as_view(), name='doubletap'),
    url(r'^modal-add-task/$', views.modalAddTaskPageView.as_view(), name='modal-add-task'),
    url(r'^modal-edit-task/$', views.modalEditTaskPageView.as_view(), name='modal-edit-task'),
    url(r'^modal-delete-task/$', views.modalDeleteTaskPageView.as_view(), name='modal-delete-task')
]