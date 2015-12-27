from django import forms
 
class AddForm(forms.Form):
    a = forms.IntegerField(label='Your age ')
    b = forms.IntegerField(label='Your expected lifetime remained')