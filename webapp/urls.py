# crowdcomms/webapp/urls.py

from django.conf.urls import url
from webapp import views

urlpatterns = [
    url(r'^$', views.HomePageView.as_view(), name='home'),
    url(r'^editTodo/$', views.EditTodoPageView.as_view(), name='editTodo'),
    url(r'^modalIndex/$', views.modalIndexPageView.as_view(), name='modalIndex'),
    url(r'^modal-add-task/$', views.modalAddTaskPageView.as_view(), name='modal-add-task')
]